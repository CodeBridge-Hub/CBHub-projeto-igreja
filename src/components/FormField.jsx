import React from "react";

const FormField = ({
  label,
  id,
  type = "text",
  placeholder,
  colSpan = "col-span-1",
  helperText,
  value,
  onChange,
  error,
  required = false,
  showHelper = true,
}) => {
  const showError = Boolean(error);

  return (
    <div className={`${colSpan} flex flex-col`}>
      <label
        htmlFor={id}
        //  Usando a cor global text-azul-principal
        className="block text-lg md:text-[20px] font-bold text-azul-principal mb-1"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      <input
        type={type}
        id={id}
        name={id}
        placeholder={placeholder}
        //  focus  usa a cor da marca azul-botao e transição suave
        className={`w-full px-4 py-2 border rounded-lg outline-none transition-all duration-200
          focus:ring-2 focus:ring-azul-botao focus:border-transparent
          ${showError ? "border-red-500" : "border-gray-300"}
        `}
        value={value}
        onChange={onChange}
      />

      <div className="min-h-[1.25rem] mt-1">
        {showError ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          showHelper && (
            // usa a cor global text-azul-principal
            <p className="text-[15px] text-azul-principal font-semibold">
              {helperText}
            </p>
          )
        )}
      </div>
    </div>
  );
};

export default FormField;
