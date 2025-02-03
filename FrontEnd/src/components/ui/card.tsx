import { FaNoteSticky, FaLink, FaYoutube } from "react-icons/fa6";
import { Tweet } from "react-twitter-widgets"; // Import Tweet widget
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { MdDeleteOutline } from "react-icons/md";
import { PiShareNetworkBold } from "react-icons/pi";
import axios from "axios";
import { useState } from "react";
import Tweet3 from "../icons/tweet";

interface CardProps {
  type: "tweet" | "document" | "link" | "youtube" | "other";
  title: string;
  link?: string;
  Subheading?: string;
  payload?: string;
  tags?: string;
  date?: string;
}

const icons = {
  tweet: <Tweet3 />,
  document: <FaNoteSticky />,
  youtube: <FaYoutube />,
  link: <FaLink />,
  other: <GiPerspectiveDiceSixFacesRandom />,
};

const getTweetId = (url: string) => {
  const match = url.match(/status\/(\d+)/);
  return match ? match[1] : null;
};

const getEmbedUrl = (url: string) => {
  let match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&]+)/);
  if (!match) {
    match = url.match(/youtube\.com\/live\/([^?&]+)/);
  }
  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
};

const Card = (props: CardProps) => {
  const [isLoading, setIsLoading] = useState(false);

  async function deletedata() {
    try {
      setIsLoading(true);
      await axios.delete(`/api/user/deletecontent`, {
        data: { title: props.title },
        withCredentials: true,
      });
      console.log("Data deleted successfully");
    } catch (error) {
      console.error("Error deleting data:", error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-[380px] border border-gray-200 rounded-xl shadow bg-white p-5 flex flex-col h-full">
      {/* Header: Icon + Title + Actions */}
      <div className="flex items-center justify-between">
        {/* Icon & Title */}
        <div className="flex items-center gap-3">
          <div className="text-xl text-gray-600">{icons[props.type]}</div>
          <span className="font-semibold text-lg text-gray-800">{props.title}</span>
        </div>

        {/* Actions: Delete & Share */}
        <div className="flex gap-3 text-gray-400 hover:text-gray-600 transition">
          <button
            disabled={isLoading}
            onClick={deletedata}
            className={`flex items-center gap-2 px-3 py-1 rounded-md ${
              isLoading ? "text-gray-400 cursor-not-allowed" : "hover:text-red-500"
            }`}
          >
            {isLoading ? "Deleting..." : "Delete"}
            <MdDeleteOutline size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Wrapper (Flexbox for Proper Layout) */}
      <div className="flex flex-col flex-grow min-h-0 overflow-hidden">
        {/* Subheading & Payload */}
        <div className="mt-3 text-black text-3xl font-medium">{props.Subheading}</div>
        <div className="mt-3 text-gray-700 flex-grow">{props.payload}</div>

        {/* Tweet Embed (Scrollable if Long) */}
        {props.type === "tweet" && props.link && getTweetId(props.link) && (
          <div className="w-full mt-3 flex-shrink-0 overflow-auto max-h-[400px]">
            <Tweet tweetId={getTweetId(props.link)!} />
          </div>
        )}

        {/* YouTube Embed (Will Not Push Footer Down) */}
        {props.type === "youtube" && props.link && (
          <div className="w-full mt-3 flex-shrink-0">
            <iframe
              className="w-full h-52 rounded-lg"
              src={getEmbedUrl(props.link)}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            ></iframe>
          </div>
        )}

        {/* External Link */}
        {props.type === "link" && props.link && (
          <div className="mt-3">
            <a href={props.link} className="text-blue-500 hover:underline break-all" target="_blank" rel="noopener noreferrer">
              {props.link}
            </a>
          </div>
        )}
      </div>

      {/* Footer (Always at Bottom) */}
      <div className="mt-auto pt-3 text-gray-500 text-sm border-t border-gray-200">
        Added on <span className="font-medium">{props.date}</span>
      </div>
    </div>
  );
};
export default Card