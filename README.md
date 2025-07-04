Backend For this project : https://github.com/UtkarshxDD/ticket-app-backend

# Trackify

**Trackify - Smart Ticket Management System** is a full-stack web application designed to manage and monitor users tickets and assigning engineers efficiently. Built with a modern tech stack, it offers robust features for administrators to oversee operations seamlessly.

## 🚀 Features

- **Ticket Management**: Add, view, and delete ticket created by user and assigned to the engineers by the admin seamlessly.
- **User & Engineer Management**: Add, view, and delete users and engineers.
- **Role-Based Access Control**: Secure authentication and authorization mechanisms.
- **Responsive Dashboard**: Intuitive interface for administrators.
- **Real-Time Notifications**: Stay updated with instant alerts.
- **RESTful API Integration**: Seamless communication between frontend and backend.

## 🛠️ Tech Stack

- **Frontend**: React.js, Tailwind CSS
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Notifications**: react-hot-toast

## 📁 Project Structure

```
Trackify/
├── backend/           # Express.js backend
│   ├── controllers/   # Route controllers
│   ├── models/        # Mongoose models
│   ├── routes/        # API routes
│   └── server.js      # Entry point
├── frontend/          # React.js frontend
│   ├── components/    # Reusable components
│   ├── pages/         # Page components
│   └── App.js         # Main React component
├── .env               # Environment variables
├── .gitignore         # Git ignore file
├── package.json       # Project metadata
└── README.md          # Project documentation
```

## ⚙️ Installation

### Prerequisites

- Node.js (v14 or higher)
- MongoDB instance (local or cloud-based)

### Steps

1. **Clone the repository:**

   ```bash
   git clone https://github.com/paramveer7267/Trackify.git
   cd Trackify
   ```

2. **Setup Backend:**

   ```bash
   cd backend
   npm install
   ```

   - Create a `.env` file in the `backend` directory with the following variables:

     ```
     PORT=5000
     MONGO_URI=your_mongodb_connection_string
     JWT_SECRET=your_jwt_secret
     ```

   - Start the backend server:

     ```bash
     npm start
     ```

3. **Setup Frontend:**

   ```bash
   cd ../frontend
   npm install
   npm start
   ```

   - The frontend will run on `http://localhost:3000`.

## 🧪 Testing

- **Backend**: Utilize tools like Postman to test API endpoints.
- **Frontend**: Interact with the UI to ensure all components function as expected.

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

## 📄 License

This project is licensed under the MIT License.

