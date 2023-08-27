import { Link } from "react-router-dom";
function Navbar() {
  return (
    <div className="p-4 flex flex-col items-center w-1/7 h-screen mx-1 my-1 bg-[#002071]">
      <div className="flex flex-col items-center space-x-4 text-white h-screen">
        <div className="flex flex-col">
          <input
            type="text"
            className="bg-blue-200 text-blue-800 px-4 py-2 rounded-lg w-11/12"
            placeholder="Search..."
          />
        </div>
        <div className="flex flex-col items-center space-x-2">
          <div className="h-8"></div>
          <div>
            <Link to="/"> Home </Link>
          </div>
          <div className="h-8"></div>

          <div>
            <Link to="/contact_us"> Contact Us </Link>
          </div>
          <div className="h-8"></div>

          <div>
            <Link to="/help"> Help </Link>
          </div>
          <div className="h-8"></div>

          <div>About</div>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
