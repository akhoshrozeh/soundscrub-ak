const FormInput = ({ label, value, onChange, placeholder, className="form_input" }) => {
    return (
      <label>
        <span className="font-satoshi font-semibold text-base text-gray-700">
          {label}
        </span>
  
        <input
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required
          className={className}
        />
      </label>
    );
  };
  
export default FormInput;