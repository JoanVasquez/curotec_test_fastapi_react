// src/components/ConfirmRegistrationForm.jsx
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { confirmUserRegistrationThunk, clearError } from '../features/user/userSlice';
import InputField from '../components/common/InputField';
import AlertMessage from '../components/common/AlertMessage';
import FormContainer from '../components/common/FormContainer';

const ConfirmRegistrationForm = () => {
  const [formData, setFormData] = useState({
    email: '',
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
    dispatch(confirmUserRegistrationThunk(formData));
  };

  let alertType = '';
  let alertMessage = '';
  if (status === 'loading') {
    alertType = 'info';
    alertMessage = 'Confirming registration...';
  } else if (status === 'failed') {
    alertType = 'danger';
    alertMessage = `Error: ${error}`;
  } else if (status === 'succeeded') {
    alertType = 'success';
    alertMessage = 'Registration confirmed successfully!';
  }

  return (
    <FormContainer title="Confirm Registration">
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
          label="Confirmation Code"
          name="confirmationCode"
          value={formData.confirmationCode}
          placeholder="Enter your confirmation code"
          onChange={handleChange}
          required
        />
        <button type="submit" className="btn btn-primary">
          Confirm
        </button>
      </form>
    </FormContainer>
  );
};

export default ConfirmRegistrationForm;
