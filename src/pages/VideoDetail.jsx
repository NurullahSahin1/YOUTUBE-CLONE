import { useSearchParams } from "react-router-dom";
import { getData } from "../helpers/Getdata";
import ReactPlayer from "react-player";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { useEffect, useState } from "react";
import millify from "millify";
import StringArea from "../components/StringArea";
import VideoCards from "../components/VideoCards";
import Loader from "../components/Loader";
import { LuListFilter } from "react-icons/lu";
import { BiDislike } from "react-icons/bi";
import { BiLike } from "react-icons/bi";

const VideoDetail = () => {
  const [video, setVideo] = useState(null);

  const [comments, setComments] = useState(null);

  const [searchParams] = useSearchParams();

  const id = searchParams.get("v");

  useEffect(() => {
    getData(`/comments?id=${id}`).then((data) => setComments(data));
  }, [searchParams]);

  console.log(comments);

  useEffect(() => {
    getData(`/video/info?id=${id}&extend=1`).then((data) => setVideo(data));
  }, [searchParams]);

  return (
    <div className="detail-page h-screen overflow-auto p-5 ">
      <div>
        <ReactPlayer
          className={"rounded"}
          width={"100%"}
          height={"50vh"}
          light
          playing
          controls
          url={`https://www.youtube.com/watch?v=${id}`}
        />
        {!video ? (
          <p>Yükleniyor...</p>
        ) : (
          <div>
            <h1 className="my-3 text-xl font-bold">{video.title}</h1>
            <div className="flex justify-between">
              <div className="flex items-center gap-4">
                <img
                  className="rounded-full w-12 h-12"
                  src={video.channelThumbnail[0].url}
                />

                <div>
                  <h4 className="font-bold">{video.channelTitle}</h4>
                  <p className="text-gray-400">{video.subscriberCountText}</p>
                </div>
                <button className="bg-white rounded-full text-black px-3 h-9 transition hover:bg-gray-400">
                  Abone Ol
                </button>
              </div>

              <div className="flex items-center bg-[#272727] rounded-full cursor-pointer">
                <div className="flex items-center gap-4 py-2 px-4 border-r">
                  <AiFillLike />
                </div>
                <div className="py-2 px-4">
                  <AiFillDislike />
                </div>
              </div>
            </div>
            <div className="bg-[#272727] rounded p-2 mt-4 cursor-pointer hover:bg-opacity-80">
              <div className="flex gap-3">
                <p>{millify(video.viewCount)} Görüntülenme</p>
                <p>{new Date(video.publishDate).toLocaleDateString}</p>
              </div>

              <StringArea text={video.description} />
            </div>

            <div className="flex flex-col mt-2">
              <div className="flex">
                <h1>{millify(video.commentCount)} Yorum</h1>

                <p className="ml-4">
                  <LuListFilter />
                </p>

                <p>Sıralama Ölçütü:</p>
              </div>
              <div className="flex p-5 justify-between items-center">
                <div className=" flex justify-center items-center bg-blue-500 w-10 h-10 text-center rounded-full text-xl mx-2">
                  Y
                </div>
                <div className="w-full h-0 border-b-2 opacity-50 border-white"></div>
              </div>

              {comments.data.map((comment) => (
                <div className="flex gap-3 my-3">
                  <div>
                    <img
                      className="rounded-full w-20"
                      src={comment.authorThumbnail[1].url}
                      alt=""
                    />
                  </div>
                  <div>
                    <div className="flex gap-2">
                      <h3>{comment.authorText}</h3>
                      <span>{comment.publishedTimeText}</span>
                    </div>
                    <div>
                      <p className="line-clamp-2">{comment.textDisplay}</p>
                    </div>
                    <div className="flex gap-4 items-center">
                      <BiLike />

                      <BiDislike />

                      <span>Yanıtla</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      <div className="flex  flex-col gap-5 p-1 md:p-6 max-md:mt-6">
        {!video ? (
          <Loader />
        ) : (
          video.relatedVideos.data.map((item) => (
            <VideoCards video={item} isRow={true} />
          ))
        )}
      </div>
    </div>
  );
};

export default VideoDetail;
