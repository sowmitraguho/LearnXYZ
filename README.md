# 📚 LearnXYZ

LearnXYZ is an interactive learning platform designed to help users master topics in math, science, and technology through structured lessons, quizzes, and real-time progress tracking. It offers an engaging, user-friendly experience for learners of all levels.

This project is built with React on the frontend and Node.js + Express + MongoDB on the backend.

---

## ✨ Features

✅ Structured Lessons  
* Topic-wise courses for focused learning  
* Step-by-step content with examples and exercises

✅ Interactive Quizzes  
* Multiple-choice questions to test understanding  
* Immediate feedback and explanations  

✅ Progress Tracking  
* Track completed lessons and quiz scores  
* Visual dashboard showing learning progress  

✅ Responsive & Accessible UI  
* Mobile-friendly design  
* Easy navigation with search and filter options  

✅ User Authentication  
* Email/password signup and login  
* Social login (Google) support  

✅ Tech Stack  

* Frontend: React, Next.js, Tailwind CSS, TanStack Query  
* Backend: Node.js, Express.js, MongoDB, JWT  
* Authentication: Firebase Authentication  
* Deployment-ready with scalable architecture  

---

## 🚀 Project Structure
```
learnxyz/
├── src/ # React frontend
│ ├── assets/
│ ├── components/
│ ├── contexts/
│ ├── firebaseAuth/
│ ├── Layouts/
│ ├── pages/
│ ├── Router/
├── main.jsx
├── app.jsx
├── ....
└── README.md
```
---

## 🛠️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/employee-management-system.git
cd employee-management-system
```

### 2️⃣ Setup the Backend

```bash
cd server
npm install
```

Create a `.env` file inside server/

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

---

### 3️⃣ Setup the Frontend

```bash
cd ../client
npm install
```

Create a `.env` file inside client/

```env
VITE_API_URL=http://localhost:5000
VITE_IMGBB_API_KEY=your_imgbb_api_key
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
```

Run the frontend:

```bash
npm run dev
```

---

## 🌟 Pages Overview
Home → Explore courses and latest updates

Course Detail → View lessons and quizzes

Dashboard → Track progress and scores

Profile → Manage account settings

## 🤝 Contributing
Contributions are welcome! Feel free to fork the repo, create a branch, and submit pull requests for improvements or new features.

## 📝 License
This project is open source and free to use under the MIT License.

yaml
Copy
Edit
