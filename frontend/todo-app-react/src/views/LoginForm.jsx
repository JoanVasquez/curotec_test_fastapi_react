// src/components/LoginForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { authenticateUserThunk, clearError } from '../features/user/userSlice';
import InputField from '../components/common/InputField';
import AlertMessage from '../components/common/AlertMessage';
import FormContainer from '../components/common/FormContainer';

const LoginForm = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(authenticateUserThunk(credentials));
  };

  let alertType = '';
  let alertMessage = '';
  if (status === 'loading') {
    alertType = 'info';
    alertMessage = 'Authenticating...';
  } else if (status === 'failed') {
    alertType = 'danger';
    alertMessage = `Error: ${error}`;
  } else if (status === 'succeeded') {
    alertType = 'success';
    alertMessage = 'Login successful!';
  }

  return (
    <FormContainer title="Login">
      <AlertMessage type={alertType} message={alertMessage} />
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          label="Email address"
          name="email"
          value={credentials.email}
          placeholder="johndoe@example.com"
          onChange={handleChange}
          required
        />
        <InputField
          type="password"
          label="Password"
          name="password"
          value={credentials.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          Login
        </button>
      </form>
    </FormContainer>
  );
};

export default LoginForm;
