// src/components/common/InputField.jsx
import React from 'react';
import PropTypes from 'prop-types';

const InputField = ({
  id,
  label,
  type = 'text',
  name,
  value,
  placeholder,
  onChange,
  required = false,
}) => (
  <div className="mb-3">
    {label && (
      <label htmlFor={id || name} className="form-label">
        {label}
      </label>
    )}
    <input
      type={type}
      className="form-control"
      id={id || name}
      name={name}
      value={value}
      placeholder={placeholder}
      onChange={onChange}
      required={required}
    />
  </div>
);

InputField.propTypes = {
  id: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  required: PropTypes.bool,
};

export default InputField;
