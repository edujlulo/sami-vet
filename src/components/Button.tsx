export default function Button({
  name,
  onClick,
  disabled,
}: {
  name: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
}) {
  return (
    <button
      className={`
        bg-amber-50
        border border-gray-300
        rounded-md
        py-1
        cursor-pointer
        shadow-sm
        hover:bg-green-50
        hover:border-green-300
        hover:shadow-md
        transform
        hover:-translate-y-px
        active:translate-y-0
        transition-all duration-150
        w-35
        disabled:bg-gray-400
        disabled:text-gray-200
        disabled:cursor-not-allowed
        disabled:hover:bg-gray-400
        disabled:opacity-60
      `}
      onClick={onClick}
      disabled={disabled}
    >
      {name}
    </button>
  );
}
