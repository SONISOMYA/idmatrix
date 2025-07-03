# IDmatrix — User Management App

##  Overview
This is a full-stack user management app with:
- ✅ Create, update, delete users
- ✅ Bulk upload users via Excel
- ✅ Downloadable template
- ✅ Validations and clear error feedback

---

## ⚙ Technologies Used

- **Frontend**: React (Vite), TypeScript, MUI
- **Backend**: Python, FastAPI, Pydantic, Pandas
- **Database**: In-memory list (for demo — no persistent DB yet)

---

## 🚀 How to Run Locally

### 1️⃣ Clone the repository
```bash
git clone https://github.com/yourusername/your-repo-name.git
cd your-repo-name
```
2️⃣ Setup backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # or venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn main:app --reload
```
3️⃣ Setup frontend
```bash
cd frontend
npm install
npm run dev
```

## Assumptions & Known Issues
	•	Data is in-memory only — so all records reset when backend restarts.
	•	Bulk upload rejects the whole file if any row has invalid data.
	•	No user authentication yet.


