import { useSearchParams } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useEffect, useState } from "react";
import { getData } from "../helpers/Getdata";
import Loader from "../components/Loader";
import VideoCards from "../components/VideoCards";

const SearchResult = () => {
  const [results, serResults] = useState(null);

  const [searchParams] = useSearchParams();

  const query = searchParams.get("search_query");

  useEffect(() => {
    getData(`/search?query=${query}&type=video`).then((res) => serResults(res));
  }, [searchParams]);
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex items-center flex-col gap-10 flex-1 px-4 h-screen overflow-auto ">
        <div className="flex gap-10 flex-col max-w-[1000px]">
          <p className="flex gap-2 text-lg">
            <span className="font-bold">{query}</span>
            <span>için sonuçlar</span>
          </p>

          {!results ? (
            <Loader />
          ) : (
            results.data.map(
              (item) =>
                item.type === "video" && (
                  <VideoCards key={item.videId} video={item} isRow={true} />
                )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchResult;
