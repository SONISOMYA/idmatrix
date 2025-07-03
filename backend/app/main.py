from fastapi import FastAPI, UploadFile, File, HTTPException 
from fastapi.middleware.cors import CORSMiddleware 
from fastapi.responses import FileResponse
from pydantic import BaseModel, EmailStr, field_validator
from typing import List
import re
import pandas as pd
from io import BytesIO
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

users_db = []
user_id_seq = 1

class User(BaseModel):
    id: int
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: str
    pan_number: str

class UserCreate(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: str
    pan_number: str

    @field_validator("phone_number")
    def phone_must_be_valid(cls, v):
        if not v.isdigit() or len(v) != 10:
            raise ValueError("Phone must be 10 digits")
        return v

    @field_validator("pan_number")
    def pan_must_be_valid(cls, v):
        if not re.match(r"^[A-Z]{5}[0-9]{4}[A-Z]$", v.upper()):
            raise ValueError("PAN must be in format AAAAA9999A")
        return v

@app.get("/users", response_model=List[User])
def get_users():
    return users_db

@app.post("/users", response_model=User)
def create_user(user: UserCreate):
    global user_id_seq
    new_user = User(id=user_id_seq, **user.dict())
    users_db.append(new_user)
    user_id_seq += 1
    return new_user
@app.put("/users/{user_id}", response_model=User)
def update_user(user_id: int, user: UserCreate):
    for idx, u in enumerate(users_db):
        if u.id == user_id:
            updated_user = User(id=user_id, **user.dict())
            users_db[idx] = updated_user
            return updated_user
    raise HTTPException(status_code=404, detail="User not found")

@app.delete("/users/{user_id}")
def delete_user(user_id: int):
    global users_db
    users_db = [u for u in users_db if u.id != user_id]
    return {"message": "Deleted"}

@app.post("/upload-users")
async def upload_users(file: UploadFile = File(...)):
    if not file.filename.endswith(".xlsx"):
        raise HTTPException(status_code=400, detail="Only .xlsx allowed")

    contents = await file.read()
    df = pd.read_excel(BytesIO(contents))

    required_cols = ["First Name", "Last Name", "Email", "Phone Number", "PAN Number"]
    missing_cols = [col for col in required_cols if col not in df.columns]

    if missing_cols:
        raise HTTPException(status_code=400, detail=f"Missing columns: {', '.join(missing_cols)}")

    from pydantic import ValidationError

    errors = []
    validated = []

    for idx, row in df.iterrows():
        try:
            user = UserCreate(
                first_name=row["First Name"],
                last_name=row["Last Name"],
                email=row["Email"],
                phone_number=str(row["Phone Number"]),
                pan_number=str(row["PAN Number"]),
            )
            validated.append(user)

        except ValidationError as ve:
            for err in ve.errors():
                field = ".".join(str(loc) for loc in err["loc"])
                msg = err["msg"]
                errors.append(f"Row {idx+2} → {field}: {msg}")

        except Exception as e:
            errors.append(f"Row {idx+2} → Unexpected Error: {str(e)}")

    if errors:
        raise HTTPException(status_code=400, detail=errors)

    for user in validated:
        create_user(user)

    return {"message": f"Uploaded {len(validated)} users successfully!"}
@app.get("/download-template")
def download_template():
    base_dir = os.path.dirname(os.path.abspath(__file__))
    file_path = os.path.join(base_dir, "template", "sample_template.xlsx")

    if not os.path.exists(file_path):
        return {"error": f"File not found at {file_path}"}

    return FileResponse(
        path=file_path,
        media_type="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        filename="sample_template.xlsx"
    )