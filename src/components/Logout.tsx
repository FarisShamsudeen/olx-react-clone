import { auth } from "../firebase/setup";
import { signOut } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";

interface LogoutProps {
  setLogoutPop: Dispatch<SetStateAction<boolean>>;
}

const Logout = ({ setLogoutPop }: LogoutProps) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setLogoutPop(false);
      localStorage.clear();
      sessionStorage.clear();
      window.location.href = "/";
      console.log("User signed out successfully.");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/75 z-50 animate-fadeIn"
      role="dialog"
      aria-modal="true"
    >
      {/* Modal Box */}
      <div className="bg-white rounded-2xl shadow-2xl w-[90%] sm:w-96 max-w-lg p-6 relative animate-slideUp">
        {/* Close Button */}
        <button
          onClick={() => setLogoutPop(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-all"
        >
          {cross}
        </button>

        {/* Content */}
        <div className="text-center mt-3">
          <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
            Are you sure you want to logout?
          </h2>

          {/* Buttons */}
          <div className="mt-6 space-y-3">
            <button
              onClick={() => {
                setLogoutPop(false);
                navigate("/my-ads");
              }}
              className="w-full border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white font-medium py-2 rounded-md transition-all duration-200"
            >
              Show My Ads
            </button>

            <button
              onClick={handleLogout}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-md transition-all duration-200"
            >
              Logout
            </button>

            <button
              onClick={() => setLogoutPop(false)}
              className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 font-medium py-2 rounded-md transition-all duration-200"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const cross = (
  <svg
    width="25px"
    height="25px"
    viewBox="0 0 1024 1024"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M878.336 85.333l-366.336 366.315-366.336-366.315h-60.331v60.331l366.336 366.336-366.336 366.336v60.331h60.331l366.336-366.336 366.336 366.336h60.331v-60.331l-366.315-366.336 366.315-366.336v-60.331z"></path>
  </svg>
);

export default Logout;

