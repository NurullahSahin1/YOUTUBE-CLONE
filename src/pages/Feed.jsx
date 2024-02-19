import { useContext } from "react";
import Sidebar from "../components/Sidebar";
import { VideoContext } from "../context/videoContext";
import VideoCards from "../components/VideoCards";
import Loader from "../components/Loader";

const Feed = () => {
  const { videos } = useContext(VideoContext);
  return (
    <div className="flex gap-4">
      <Sidebar />

      <div className="videos">
        {!videos ? (
          <Loader />
        ) : (
          videos?.map(
            (i) =>
              i.type === "video" && <VideoCards key={i.videoId} video={i} />
          )
        )}
      </div>
    </div>
  );
};

export default Feed;
