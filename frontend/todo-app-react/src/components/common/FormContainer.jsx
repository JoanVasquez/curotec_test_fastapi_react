// src/components/common/FormContainer.jsx
import React from 'react';
import PropTypes from 'prop-types';

const FormContainer = ({ title, children }) => (
  <div className="container mt-5">
    <h2 className="mb-4">{title}</h2>
    {children}
  </div>
);

FormContainer.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export default FormContainer;
