const FormInput = ({ label, value, onChange, placeholder, inputType="form_input" }) => {
    console.log(label)
    console.log(inputType)
    return (
        <>
        {inputType == "form_textarea" ? (
            <label>
                <span className="font-satoshi font-semibold text-base text-gray-700">
                {label}
                </span>

                <textarea
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    className={inputType}
                />
            </label>
        ) : (
            <label>
                <span className="font-satoshi font-semibold text-base text-gray-700">
                {label}
                </span>

                <input
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    required
                    className={inputType}
                />
            </label>

        )}
        </>
      
    );
  };
  
export default FormInput;