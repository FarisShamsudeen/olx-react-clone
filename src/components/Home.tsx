import { Link } from "react-router-dom";

type ProductsProp = {
  products: any[];
};

const Home = ({ products }: ProductsProp) => {
  return (
    <div className="px-4 sm:px-8 md:px-12 lg:px-20 py-8 bg-gray-50 min-h-screen">
      <h1 className="text-xl sm:text-2xl mb-6 text-black">
        {products.length > 0 ? "Fresh Recommendations" : "Be the first to be published"}
      </h1>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {products.map((data: any) => (
            <Link
              to="/details"
              key={data._id || data.id}
              state={{ data }}
              className="group"
            >
              <div className="bg-white border border-gray-300 rounded-sm shadow-sm hover:shadow-lg transition-shadow duration-200 cursor-pointer h-full flex flex-col">
                {/* Image */}
                <div className="h-48 sm:h-56 bg-gray-100 flex items-center justify-center overflow-hidden rounded-t-sm p-2">
                  <img
                    src={data?.image}
                    alt={data?.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col flex-grow">
                  <h2 className="text-lg font-semibold text-gray-800 mb-1 truncate">
                    ₹ {data?.price}
                  </h2>
                  <p className="text-sm text-gray-600 truncate mb-2">
                    {data?.title}
                  </p>
                  <div className="mt-auto">
                    <p className="text-xs text-gray-400">{data?.category}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center text-center mt-20">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-600">
            No Ads Yet
          </h1>
          <p className="text-gray-500 mt-2 text-sm sm:text-base">
            Be the first to post an ad in your area!
          </p>
          <Link
            to="/create-ad"
            className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-5 py-2 rounded-md transition-all"
          >
            Post an Ad
          </Link>
        </div>
      )}
    </div>
  );
};

export default Home;

