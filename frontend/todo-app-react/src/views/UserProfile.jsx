// src/components/UserProfile.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserByIdThunk, updateUserThunk, clearError } from '../features/user/userSlice';
import InputField from '../components/common/InputField';
import AlertMessage from '../components/common/AlertMessage';
import FormContainer from '../components/common/FormContainer';

const UserProfile = () => {
  const dispatch = useDispatch();
  const { user, status, error } = useSelector((state) => state.user);
  const [updateData, setUpdateData] = useState({
    email: '',
    name: '',
    password: '',
  });

  // Assume that if user is already in the state, we use its ID.
  const userId = user?.id;

  // Populate update form when user data is available.
  useEffect(() => {
    if (user) {
      setUpdateData({
        email: user.email || '',
        name: user.name || '',
        password: '', // Leave password blank unless changed.
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdateData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(clearError());
    dispatch(updateUserThunk({ id: userId, updateData }));
  };

  let alertType = '';
  let alertMessage = '';
  if (status === 'loading') {
    alertType = 'info';
    alertMessage = 'Updating profile...';
  } else if (status === 'failed') {
    alertType = 'danger';
    alertMessage = `Error: ${error}`;
  } else if (status === 'succeeded') {
    alertType = 'success';
    alertMessage = 'Profile updated successfully!';
  }

  return (
    <FormContainer title="User Profile">
      <AlertMessage type={alertType} message={alertMessage} />
      {user && (
        <>
          <div className="card mb-4">
            <div className="card-body">
              <h5 className="card-title">Profile Details</h5>
              <p className="card-text">
                <strong>Email:</strong> {user.email}
              </p>
              <p className="card-text">
                <strong>Name:</strong> {user.name}
              </p>
            </div>
          </div>
          <h3 className="mb-3">Update Profile</h3>
          <form onSubmit={handleSubmit}>
            <InputField
              type="email"
              label="Email"
              name="email"
              value={updateData.email}
              onChange={handleChange}
              required
            />
            <InputField
              label="Name"
              name="name"
              value={updateData.name}
              onChange={handleChange}
              required
            />
            <InputField
              type="password"
              label="New Password"
              name="password"
              value={updateData.password}
              placeholder="Leave blank if unchanged"
              onChange={handleChange}
            />
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </form>
        </>
      )}
    </FormContainer>
  );
};

export default UserProfile;
