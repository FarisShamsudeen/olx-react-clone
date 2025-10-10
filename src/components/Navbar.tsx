import { useState } from "react";
import { Link } from "react-router-dom";
import olx from "../assets/olx.png";
import lens from "../assets/lens.png";
import arrow from "../assets/arrow.png";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const [loginPop, setLoginPop] = useState(false);
  const [logoutPop, setLogoutPop] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  const { currentUser } = useAuth();

  return (
    <>
      <nav className="sticky top-0 z-50 bg-slate-100 shadow-sm w-full">
        {/* Desktop Navbar */}
        <div className="hidden sm:flex items-center px-4 py-3">
          <Link to="/" className="flex items-center gap-2">
            <img src={olx} alt="OLX" className="w-12 h-12" />
          </Link>

          {/* Location Bar */}
          <div className="flex items-center border-3 w-68 py-3.5 px-2 border-black ml-4 rounded-sm bg-white">
            <img src={lens} className="w-5 h-5" />
            <input placeholder="Location" value="Location" className="pl-2 w-full outline-none text-black text-sm" />
            <img src={arrow} className="w-5 h-5" />
          </div>

          {/* Search Bar */}
          <div className="flex flex-auto h-13 ml-4 border-3 border-black rounded-sm bg-white">
            <input
              placeholder='Search "Cars, Phones..."'
              className="ml-3 w-full outline-none text-sm"
            />
            <div className="flex items-center justify-center w-15 bg-black text-white ">
              {search}
            </div>
          </div>

          {/* Language + Icons */}
          <div className="flex items-center ml-4">
            <span className="font-semibold text-sm">ENGLISH</span>
            <img src={arrow} className="w-5 h-5 ml-1 opacity-60" />
          </div>

          <div className="flex items-center ml-3">{heart}</div>

          {/* Auth Section */}
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

          {/* Sell Button */}
          <div className="ml-6">
            <Link to="/create-ad">
              <button className="olx-sell-btn-wrapper flex items-center gap-1 h-9 w-20 justify-center">
                {plus}
                <span className="font-medium text-sm text-[#002F34]">SELL</span>
              </button>
            </Link>
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="flex sm:hidden items-center justify-between px-4 py-2">
          <Link to="/">
            <img src={olx} className="w-10 h-10" />
          </Link>

          <div className="flex items-center gap-4">
            <Link to="/create-ad">{plus}</Link>

            {currentUser ? (
              <img
                src={currentUser.photoURL || "/default-avatar.png"}
                alt="user"
                className="w-8 h-8 rounded-full border cursor-pointer"
                onClick={() => setLogoutPop(true)}
              />
            ) : (
              <button
                onClick={() => setLoginPop(true)}
                className="text-sm font-semibold underline"
              >
                Login
              </button>
            )}

            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="focus:outline-none"
            >
              {menuOpen ? closeIcon : menuIcon}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {menuOpen && (
          <div className="sm:hidden bg-white border-t border-gray-200 py-3 px-4 space-y-3 shadow-md">
            <Link
              to="/"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-800 font-medium"
            >
              Home
            </Link>
            <Link
              to="/create-ad"
              onClick={() => setMenuOpen(false)}
              className="block text-gray-800 font-medium"
            >
              Post an Ad
            </Link>
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

/* --- SVG Icons --- */
const search = (
  <svg width="22px" height="22px" viewBox="0 0 1024 1024" fill="white">
    <path d="M448 725.333c-152.917 0-277.333-124.416-277.333-277.333s124.416-277.333 277.333-277.333c152.917 0 277.333 124.416 277.333 277.333s-124.416 277.333-277.333 277.333zM884.437 824.107l-151.915-151.936c48.768-61.781 78.144-139.541 78.144-224.192 0-199.979-162.688-362.667-362.667-362.667s-362.667 162.688-362.667 362.667c0 199.979 162.688 362.667 362.667 362.667 84.629 0 162.411-29.376 224.171-78.144l206.144 206.144h60.352v-60.331z"></path>
  </svg>
);

const heart = (
  <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-w4DG7" d="M830.798 448.659l-318.798 389.915-317.828-388.693c-20.461-27.171-31.263-59.345-31.263-93.033 0-85.566 69.605-155.152 155.152-155.152 72.126 0 132.752 49.552 150.051 116.364h87.777c17.299-66.812 77.905-116.364 150.051-116.364 85.547 0 155.152 69.585 155.152 155.152 0 33.687-10.802 65.862-30.293 91.811zM705.939 124.121c-80.853 0-152.204 41.425-193.939 104.204-41.736-62.778-113.086-104.204-193.939-104.204-128.33 0-232.727 104.378-232.727 232.727 0 50.657 16.194 98.948 47.806 140.897l328.766 402.133h100.189l329.716-403.355c30.662-40.727 46.856-89.018 46.856-139.675 0-128.349-104.398-232.727-232.727-232.727z"></path></svg>);

const chat = (
  <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-w4DG7" d="M469.333 171.119c-164.693 0-298.667 134.684-298.667 300.25v359.529l108.907-54.753 19.093-4.525h256c164.693 0 298.667-134.684 298.667-300.25s-133.973-300.25-298.667-300.25h-85.333zM147.093 938.667l-61.76-38.368v-428.929c0-212.856 172.267-386.036 384-386.036h85.333c211.733 0 384 173.18 384 386.036s-172.267 386.036-384 386.036h-245.931l-161.643 81.261z"></path></svg>);

const bell = (
  <svg width="24px" height="24px" viewBox="0 0 1024 1024" data-aut-id="icon" class="" fill-rule="evenodd"><path class="rui-w4DG7" d="M730.855 763.955h-435.559c-0.833-87.945-2.676-279.627-2.676-289.496 0-119.351 98.911-216.463 220.498-216.463s220.455 97.112 220.455 216.463c0 10-1.843 201.594-2.72 289.496v0zM819.282 748.603c0.92-93.341 2.062-266.38 2.062-274.144 0-141.589-98.692-260.545-231.64-294.319 2.192-7.237 3.684-14.782 3.684-22.765 0-44.345-35.969-80.27-80.27-80.27-44.345 0-80.27 35.923-80.27 80.27 0 7.983 1.491 15.483 3.684 22.765-132.948 33.731-231.64 152.687-231.64 294.319 0 7.721 1.14 182.339 2.019 276.030l-90.27 36.581 0.92 64.609h316.032c3.729 40.881 37.679 73.031 79.523 73.031s75.794-32.151 79.523-73.031h312.962l1.754-64.523-88.078-38.556z"></path></svg>
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

