// src/components/PasswordResetInitiate.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { initiatePasswordResetThunk, clearError } from '../features/user/userSlice';
import InputField from '../components/common/InputField';
import AlertMessage from '../components/common/AlertMessage';
import FormContainer from '../components/common/FormContainer';

const PasswordResetInitiate = () => {
  const [email, setEmail] = useState('');
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.user);

  const handleChange = (e) => setEmail(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(initiatePasswordResetThunk(email));
  };

  let alertType = '';
  let alertMessage = '';
  if (status === 'loading') {
    alertType = 'info';
    alertMessage = 'Processing password reset initiation...';
  } else if (status === 'failed') {
    alertType = 'danger';
    alertMessage = `Error: ${error}`;
  } else if (status === 'succeeded') {
    alertType = 'success';
    alertMessage = 'Password reset email sent!';
  }

  return (
    <FormContainer title="Initiate Password Reset">
      <AlertMessage type={alertType} message={alertMessage} />
      <form onSubmit={handleSubmit}>
        <InputField
          type="email"
          label="Email Address"
          name="email"
          value={email}
          placeholder="johndoe@example.com"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          Send Reset Email
        </button>
      </form>
    </FormContainer>
  );
};

export default PasswordResetInitiate;
