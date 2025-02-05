// src/components/PasswordResetComplete.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { completePasswordResetThunk, clearError } from '../features/user/userSlice';
import InputField from '../components/common/InputField';
import AlertMessage from '../components/common/AlertMessage';
import FormContainer from '../components/common/FormContainer';

const PasswordResetComplete = () => {
  const [formData, setFormData] = useState({
    email: '',
    newPassword: '',
    confirmationCode: '',
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
    dispatch(completePasswordResetThunk(formData));
  };

  let alertType = '';
  let alertMessage = '';
  if (status === 'loading') {
    alertType = 'info';
    alertMessage = 'Resetting password...';
  } else if (status === 'failed') {
    alertType = 'danger';
    alertMessage = `Error: ${error}`;
  } else if (status === 'succeeded') {
    alertType = 'success';
    alertMessage = 'Password reset successfully!';
  }

  return (
    <FormContainer title="Complete Password Reset">
      <AlertMessage type={alertType} message={alertMessage} />
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          label="Email Address"
          name="email"
          value={formData.email}
          placeholder="johndoe@example.com"
          onChange={handleChange}
          required
        />
        <InputField
          type="password"
          label="New Password"
          name="newPassword"
          value={formData.newPassword}
          onChange={handleChange}
          required
        />
        <InputField
          label="Confirmation Code"
          name="confirmationCode"
          value={formData.confirmationCode}
          placeholder="Enter confirmation code"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </form>
    </FormContainer>
  );
};

export default PasswordResetComplete;
