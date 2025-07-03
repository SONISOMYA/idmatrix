from pydantic import BaseModel, EmailStr, validator
import re

class UserBase(BaseModel):
    first_name: str
    last_name: str
    email: EmailStr
    phone_number: str
    pan_number: str

    @validator("phone_number")
    def validate_phone(cls, v):
        if not (v.isdigit() and len(v) == 10):
            raise ValueError("Phone must be 10 digits")
        return v

    @validator("pan_number")
    def validate_pan(cls, v):
        pattern = r"^[A-Z]{5}[0-9]{4}[A-Z]$"
        if not re.match(pattern, v.upper()):
            raise ValueError("PAN must be in format AAAAA9999A")
        return v.upper()

class UserCreate(UserBase):
    pass

class UserOut(UserBase):
    id: int

    class Config:
        orm_mode = True