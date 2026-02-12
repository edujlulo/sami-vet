export default function LabelInput({ label, type, value, onChange, disabled }) {
  return (
    <div className="flex flex-col gap-1">
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        disabled={disabled}
        className="bg-amber-50 border border-gray-700"
      />
    </div>
  );
}
