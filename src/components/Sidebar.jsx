import { useContext } from "react";
import { categories } from "../constant/Index";
import { VideoContext } from "../context/videoContext";
const Sidebar = () => {
  const { selectedCategory, setSelectedCategory } = useContext(VideoContext);
  console.log(selectedCategory);
  return (
    <div className="flex flex-col p-1 md:p-4">
      {categories.map((item) => (
        <div onClick={() => setSelectedCategory(item)} key={item.name}>
          <div
            className={`${
              selectedCategory.name === item.name && "bg-[#2b2a2a]"
            } flex items-center gap-2 py-4 px-2 md:px-3 text-base md:text-lg cursor-pointer rounded-md hover:bg-[#2d2d2d]`}
          >
            <span className="max-sm:text-2xl">{item.icon}</span>
            <span className="max-sm:hidden">{item.name}</span>
          </div>
          {item.divider && <hr />}
        </div>
      ))}
    </div>
  );
};

export default Sidebar;
