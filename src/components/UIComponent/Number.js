export const Number = ({ value, onChange, className = '' }) => {
  return (
    <input
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className={`node-card-textarea ${className}`}
    />
  );
};
