import { Link, useNavigate } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaBell } from "react-icons/fa";
import { FaVideo } from "react-icons/fa";

const Headers = () => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    const text = e.target[0].value;

    navigate(`/results?search_query=${text}`);
  };
  return (
    <div className="flex justify-between items-center p-4">
      <Link to={"/"} className="flex items-center gap-[10px]">
        <img className="w-[50px]" src="/youtube.png" alt="yt logo" />
        <h1 className="hidden md:block text-2xl">Youtube</h1>
      </Link>

      <form
        onSubmit={handleSubmit}
        className="flex items-center border border-gray-400 rounded-[20px] overflow-hidden"
      >
        <input
          className="bg-black outline-none text-white px-3 py-1"
          type="text"
        />
        <button className="border-1 px-2 text-xl">
          <CiSearch />
        </button>
      </form>
      <div className="flex gap-3 text-xl cursor-pointer">
        <span>
          <FaBell className="hover:text-gray-400 transition duration-200" />
        </span>
        <span>
          <FaVideo className="hover:text-gray-400 transition duration-200" />
        </span>
      </div>
    </div>
  );
};

export default Headers;
