export const Input = ({ value, onChange, placeholder = "", className = "", type = "text" }) => {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`node-card-input ${className}`}
    />
  );
};
