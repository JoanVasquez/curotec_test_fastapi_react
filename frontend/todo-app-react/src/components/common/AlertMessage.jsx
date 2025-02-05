// src/components/common/AlertMessage.jsx
import React from 'react';
import PropTypes from 'prop-types';

const AlertMessage = ({ type, message }) => {
  if (!message) return null;
  return (
    <div className={`alert alert-${type}`} role="alert">
      {message}
    </div>
  );
};

AlertMessage.propTypes = {
  type: PropTypes.oneOf(['info', 'danger', 'success']).isRequired,
  message: PropTypes.string,
};

export default AlertMessage;
