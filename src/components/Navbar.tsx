import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import olx from "../assets/olx.png";
import lens from "../assets/lens.png";
import arrow from "../assets/arrow.png";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthContext";

import toast, { Toaster } from "react-hot-toast";

const Navbar = () => {
  const [loginPop, setLoginPop] = useState(false);
  const [logoutPop, setLogoutPop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSellClick = () => {
    if (!currentUser) {
      toast.error("You must be logged in to post an ad!", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "#fef2f2",
          color: "#b91c1c",
          border: "1px solid #fecaca",
          fontWeight: "500",
        },
      });


      return;
    }

    navigate("/create-ad");
  };

  return (
    <>
      <Toaster />

      <nav className="sticky top-0 z-50 bg-slate-100 shadow-sm w-full">
        <div className="hidden sm:flex items-center px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={olx} alt="OLX" className="w-12 h-12" />
          </Link>

          <div className="flex items-center border-3 w-68 py-3.5 px-2 border-black ml-4 rounded-sm bg-white">
            <img src={lens} className="w-5 h-5" />
            <input
              placeholder="Location"
              value="Location"
              className="pl-2 w-full outline-none text-black text-sm"
            />
            <img src={arrow} className="w-5 h-5" />
          </div>

          <div className="flex flex-auto h-13 ml-4 border-3 border-black rounded-sm bg-white">
            <input
              placeholder='Search "Cars, Phones..."'
              className="ml-3 w-full outline-none text-sm"
            />
            <div className="flex items-center justify-center w-15 bg-black text-white">
              {search}
            </div>
          </div>

          <div className="flex items-center ml-4">
            <span className="font-semibold text-sm">ENGLISH</span>
            <img src={arrow} className="w-5 h-5 ml-1 opacity-60" />
          </div>

          <div className="flex items-center ml-3">{heart}</div>

          {currentUser ? (
            <div className="flex items-center ml-4 gap-3">
              <div>{chat}</div>
              <div>{bell}</div>
              <div
                onClick={() => setLogoutPop(true)}
                className="flex items-center gap-1 cursor-pointer"
              >
                <img
                  src={currentUser.photoURL || "/default-avatar.png"}
                  alt="user"
                  className="h-8 w-8 rounded-full object-cover"
                />
                {downArrow}
              </div>
              {logoutPop && <Logout setLogoutPop={setLogoutPop} />}
            </div>
          ) : (
            <>
              <button
                onClick={() => setLoginPop(true)}
                className="font-bold text-base ml-6 underline hover:no-underline"
              >
                Login
              </button>
              {loginPop && <Login setLoginPop={setLoginPop} />}
            </>
          )}

          <div className="ml-6">
            <button
              onClick={handleSellClick}
              className="olx-sell-btn-wrapper flex items-center gap-1 h-9 w-20 justify-center"
            >
              {plus}
              <span className="font-medium text-sm text-[#002F34]">SELL</span>
            </button>
          </div>
        </div>

        <div className="flex sm:hidden items-center justify-between px-4 py-2">
          <Link to="/">
            <img src={olx} className="w-10 h-10" />
          </Link>

          <div className="flex items-center gap-4">
            <button onClick={handleSellClick}>{plus}</button>

            {currentUser ? (
              <>
                <img
                  src={currentUser.photoURL || "/default-avatar.png"}
                  alt="user"
                  className="w-8 h-8 rounded-full border cursor-pointer"
                  onClick={() => setLogoutPop(true)}
                />
                {logoutPop && <Logout setLogoutPop={setLogoutPop} />}
              </>
            ) : (
              <>
              <button
                onClick={() => setLoginPop(true)}
                className="text-sm font-semibold underline"
              >
                Login
              </button>
              {loginPop && <Login setLoginPop={setLoginPop} />}
              </>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              {menuOpen ? closeIcon : menuIcon}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200 py-3 px-4 space-y-3 shadow-md">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-800 font-medium"
            >
              Home
            </Link>
            <button
              onClick={() => {
                handleSellClick();
                setMenuOpen(false);
              }}
              className="block text-gray-800 font-medium"
            >
              Post an Ad
            </button>
            <Link
              to="/my-ads"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-800 font-medium"
            >
              My Ads
            </Link>
            <div className="flex gap-3 pt-2">
              {heart}
              {chat}
              {bell}
            </div>
          </div>
        )}
      </nav>
    </>
  );
};

const search = (
  <svg width="22px" height="22px" viewBox="0 0 1024 1024" fill="white">
    <path d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333zM884.437 824.107l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331z"></path>
  </svg>
);

const heart = (
  <svg width="24px" height="24px" viewBox="0 0 1024 1024" fill="#333">
    <path d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811z"></path>
  </svg>
);

const chat = (
  <svg width="24px" height="24px" viewBox="0 0 1024 1024" fill="#333">
    <path d="M469.333 171.119c-164.693 0-298.667 134.684-298.667 300.25v359.529l108.907-54.753 19.093-4.525h256c164.693 0 298.667-134.684 298.667-300.25s-133.973-300.25-298.667-300.25h-85.333z"></path>
  </svg>
);

const bell = (
  <svg width="24px" height="24px" viewBox="0 0 1024 1024" fill="#333">
    <path d="M730.855 763.955h-435.559c-0.833-87.945-2.676-279.627-2.676-289.496 0-119.351 98.911-216.463 220.498-216.463s220.455 97.112 220.455 216.463c0 10-1.843 201.594-2.72 289.496v0z"></path>
  </svg>
);

const downArrow = (
  <svg width="18px" height="18px" viewBox="0 0 1024 1024" fill="#333">
    <path d="M85.392 277.333h60.331l366.336 366.336 366.336-366.336h60.331v60.331l-408.981 409.003h-35.307l-409.045-409.003z"></path>
  </svg>
);

const plus = (
  <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none" stroke="#002F34" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19"></line>
    <line x1="5" y1="12" x2="19" y2="12"></line>
  </svg>
);

const menuIcon = (
  <svg width="24" height="24" fill="#333" viewBox="0 0 24 24">
    <path d="M4 6h16M4 12h16M4 18h16" stroke="#333" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const closeIcon = (
  <svg width="24" height="24" fill="#333" viewBox="0 0 24 24">
    <path d="M6 18L18 6M6 6l12 12" stroke="#333" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export default Navbar;

