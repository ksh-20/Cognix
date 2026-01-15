import { useState } from "react";
import { useAuth } from "../context/AuthContext";

const UserMenu = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm px-3 py-1 border rounded"
      >
        {user?.name}
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white dark:bg-gray-800 border rounded shadow">
          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserMenu;