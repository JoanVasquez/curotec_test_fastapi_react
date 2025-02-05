// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

// Import the refactored components.
import RegisterUserForm from './views/RegisterUserForm';
import LoginForm from './views/LoginForm';
import ConfirmRegistrationForm from './views/ConfirmRegistrationForm';
import PasswordResetInitiate from './views/PasswordResetInitiate';
import PasswordResetComplete from './views/PasswordResetComplete';
import UserProfile from './views/UserProfile';


function App() {
  return (
    <Router>
      <div className="App">
        {/* Header with navigation links */}
        <header className="App-header bg-dark text-white p-3">
          <div className="container d-flex align-items-center justify-content-between">
            <h1 className="App-title">My React App</h1>
            <nav>
              <ul className="nav">
                <li className="nav-item">
                  <Link to="/register" className="nav-link text-white">
                    Register
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/login" className="nav-link text-white">
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/confirm" className="nav-link text-white">
                    Confirm
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/password-reset" className="nav-link text-white">
                    Password Reset
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/profile" className="nav-link text-white">
                    Profile
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </header>

        {/* Main content area */}
        <main className="py-4">
          <div className="container">
            <Routes>
              <Route path="/register" element={<RegisterUserForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/confirm" element={<ConfirmRegistrationForm />} />
              <Route path="/password-reset" element={<PasswordResetInitiate />} />
              <Route path="/password-reset/complete" element={<PasswordResetComplete />} />
              <Route path="/profile" element={<UserProfile />} />
              {/* Default route can be set to any component */}
              <Route path="/" element={<RegisterUserForm />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
