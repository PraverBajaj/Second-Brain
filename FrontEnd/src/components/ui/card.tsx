import { FaNoteSticky, FaLink, FaYoutube } from "react-icons/fa6";
import { Tweet } from "react-twitter-widgets"; // Import Tweet widget
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { MdDeleteOutline } from "react-icons/md";
import axios from "axios";
import { useState } from "react";
import Tweet3 from "../icons/tweet";
import { Backend_URL } from "../../config";

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
      await axios.delete(`${Backend_URL}/user/deletecontent`, {
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
    <div className="w-full overflow-auto border border-gray-200 rounded-xl shadow bg-white p-5 flex flex-col h-full">
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
              isLoading ? "text-gray-400 cursor-not-allowed" : "hover:text-red-500 hover:cursor-pointer"
            }`}
          >
            {isLoading ? "Deleting..." : "Delete"}
            <MdDeleteOutline size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Wrapper (Using Grid to Avoid Misalignment) */}
      <div className="grid grid-rows-[min-content] gap-3 flex-grow">
        {/* Subheading & Payload */}
        {props.Subheading && (
          <div className="text-black text-3xl font-medium">{props.Subheading}</div>
        )}
        {props.payload && (
          <div className="text-gray-700">{props.payload}</div>
        )}

        {/* Tweet Embed (Ensuring it Doesn't Affect Other Elements) */}
        {props.type === "tweet" && props.link && getTweetId(props.link) && (
          <div className=" w-full overflow-auto">
            <Tweet tweetId={getTweetId(props.link)!} />
          </div>
        )}

        {/* YouTube Embed (Now Aligned Properly) */}
        {props.type === "youtube" && props.link && (
          <div className="w-full">
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
          <div>
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
export default Card;
