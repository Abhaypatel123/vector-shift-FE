export const TextArea = ({ value, onChange, rows = 3, className = '' }) => {
  return (
    <textarea
      value={value}
      rows={rows}
      onChange={(e) => onChange(e.target.value)}
      className={`node-card-textarea ${className}`}
    />
  );
};
