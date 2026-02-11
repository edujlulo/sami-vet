export default function Button({ name }: { name: string }) {
  return (
    <button
      className="
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
        hover:-translate-y-[1px]
        active:translate-y-0
        transition-all duration-150
        w-40
        transition-all duration-150 ease-in-out
      "
    >
      {name}
    </button>
  );
}
