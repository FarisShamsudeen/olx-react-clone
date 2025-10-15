import { Route, Routes } from "react-router-dom";
import Main from "./components/Main";
import Details from "./components/Details";
import CreateAd from "./components/CreateAd";
import MyAds from "./components/MyAds";
import PrivateRoute from "./components/PrivateRoute";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/details" element={<Details />} />
      <Route path="/create-ad" element={<PrivateRoute element={<CreateAd />} />} />
      <Route path="/my-ads" element={<PrivateRoute element={<MyAds />} />} />
    </Routes>
  );
};

export default App;

