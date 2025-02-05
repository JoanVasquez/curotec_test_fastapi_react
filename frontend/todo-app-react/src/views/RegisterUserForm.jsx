// src/components/RegisterUserForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { registerUserThunk, clearError } from '../features/user/userSlice';
import InputField from '../components/common/InputField';
import AlertMessage from '../components/common/AlertMessage';
import FormContainer from '../components/common/FormContainer';

const RegisterUserForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
  });
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(registerUserThunk(formData));
  };

  // Determine which alert to show
  let alertType = '';
  let alertMessage = '';
  if (status === 'loading') {
    alertType = 'info';
    alertMessage = 'Registering user...';
  } else if (status === 'failed') {
    alertType = 'danger';
    alertMessage = `Error: ${error}`;
  } else if (status === 'succeeded') {
    alertType = 'success';
    alertMessage = 'User registered successfully!';
  }

  return (
    <FormContainer title="Register User">
      <AlertMessage type={alertType} message={alertMessage} />
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          label="Email address"
          name="email"
          value={formData.email}
          placeholder="johndoe@example.com"
          onChange={handleChange}
          required
        />
        <InputField
          label="Full Name"
          name="name"
          value={formData.name}
          placeholder="John Doe"
          onChange={handleChange}
          required
        />
        <InputField
          type="password"
          label="Password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          Register
        </button>
      </form>
    </FormContainer>
  );
};

export default RegisterUserForm;
