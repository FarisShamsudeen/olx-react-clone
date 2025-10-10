import facebook from "../assets/facebook.png";
import instagram from "../assets/instagram.png";
import youtube from "../assets/youtube.png";
import x from "../assets/x.png";
import whatsapp from "../assets/whatsapp.png";
import linkedin from "../assets/linkedin.png";
import playstore from "../assets/playstore.png";
import appstore from "../assets/appstore.png";
import cartrade_group from "../assets/cartrade_group.png";
import olx_2025 from "../assets/olx_2025.png";
import carwale from "../assets/carwale.png";
import bikewale from "../assets/bikewale.png";
import cartrade from "../assets/cartrade.png";
import mobility from "../assets/mobility.png";

const Footer = () => {
  return (
    <footer className="bg-gray-100 w-full flex flex-col">

      <div className="py-8 px-6 sm:px-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 text-gray-600 text-sm">
        <div>
          <h3 className="font-bold text-gray-800 mb-3">POPULAR LOCATIONS</h3>
          <ul className="space-y-1">
            <li className="hover:text-black cursor-pointer">Kolkata</li>
            <li className="hover:text-black cursor-pointer">Mumbai</li>
            <li className="hover:text-black cursor-pointer">Chennai</li>
            <li className="hover:text-black cursor-pointer">Pune</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-3">TRENDING LOCATIONS</h3>
          <ul className="space-y-1">
            <li className="hover:text-black cursor-pointer">Bhubaneshwar</li>
            <li className="hover:text-black cursor-pointer">Hyderabad</li>
            <li className="hover:text-black cursor-pointer">Chandigarh</li>
            <li className="hover:text-black cursor-pointer">Nashik</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-3">ABOUT US</h3>
          <ul className="space-y-1">
            <li className="hover:text-black cursor-pointer">Tech@OLX</li>
            <li className="hover:text-black cursor-pointer">Careers</li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-3">OLX</h3>
          <ul className="space-y-1">
            <li className="hover:text-black cursor-pointer">Blog</li>
            <li className="hover:text-black cursor-pointer">Help</li>
            <li className="hover:text-black cursor-pointer">Sitemap</li>
            <li className="hover:text-black cursor-pointer">
              Legal & Privacy information
            </li>
            <li className="hover:text-black cursor-pointer">
              Vulnerability disclosure program
            </li>
          </ul>
        </div>

        <div>
          <h3 className="font-bold text-gray-800 mb-3">FOLLOW US</h3>
          <div className="flex gap-3 flex-wrap mb-3">
            {[facebook, instagram, youtube, x, whatsapp, linkedin].map((img, i) => (
              <img key={i} src={img} className="w-5 h-5 sm:w-6 sm:h-6" />
            ))}
          </div>
          <div className="flex gap-3 flex-wrap">
            <img src={playstore} className="w-24 sm:w-28" />
            <img src={appstore} className="w-24 sm:w-28" />
          </div>
        </div>
      </div>


      <div className="bg-[#004896] text-white">
        <div className="max-w-7xl mx-auto px-6 flex flex-col items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <img src={cartrade_group} className="w-40 border-r border-white pr-6" />
            <div className="flex flex-wrap gap-5 justify-center sm:justify-start">
              {[olx_2025, carwale, bikewale, cartrade, mobility].map((img, i) => (
                <img key={i} src={img} className="w-20 sm:w-24 object-contain" />
              ))}
            </div>
          </div>
          <p className="text-xs text-center sm:text-right">
            Help - Sitemap • Clone © 2006–2025 OLX
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

