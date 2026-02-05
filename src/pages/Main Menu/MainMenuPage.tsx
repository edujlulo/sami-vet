import { Link } from "react-router-dom";

export default function MainMenuPage() {
  return (
    <div className="p-10">
      <h1 className="text-3xl mb-6">Main Menu</h1>
      <div className="flex flex-col gap-3">
        <Link
          to="/patients"
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Patient Locator
        </Link>
        <button className="bg-gray-500 text-white px-4 py-2 rounded">
          Other Option
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => {
            localStorage.removeItem("isLoggedIn");
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
