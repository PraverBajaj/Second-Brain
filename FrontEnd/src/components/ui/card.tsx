import { FaNoteSticky, FaLink, FaYoutube } from "react-icons/fa6";
import Tweet from "../icons/tweet";
import { GiPerspectiveDiceSixFacesRandom } from "react-icons/gi";
import { MdDeleteOutline } from "react-icons/md";
import { PiShareNetworkBold } from "react-icons/pi";
import axios from "axios";
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
  tweet: <Tweet />,
  document: <FaNoteSticky />,
  youtube: <FaYoutube />,
  link: <FaLink />,
  other: <GiPerspectiveDiceSixFacesRandom />,
};


const getEmbedUrl = (url: string) => {
  // Match for regular YouTube video URLs (with query params)
  let match = url.match(/[?&]v=([^&]+)/) || url.match(/youtu\.be\/([^?&]+)/);

  // Match for YouTube Live streams (with query params)
  if (!match) {
    match = url.match(/youtube\.com\/live\/([^?&]+)/);
  }

  return match ? `https://www.youtube.com/embed/${match[1]}` : "";
};

const Card = (props: CardProps) => {


  async function deletedata() {
    try {
      await axios.delete(`${Backend_URL}/user/deletecontent`, {
        data: {
          title: props.title
        },withCredentials:true
      })
      console.log("Data deleted successfully")

    } catch (error) {
      console.error("Error deleting data:", error);
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
          
          <button onClick={deletedata} className="hover:text-red-500">
            <MdDeleteOutline size={20} />
          </button>
          <button className="hover:text-blue-500">
            <PiShareNetworkBold size={20} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className="mt-3 text-black text-3xl font-medium">{props.Subheading}</div>
      <div className="mt-3 text-gray-700 flex-grow">{props.payload}</div>

      {/* YouTube Embed */}
      {props.type === "youtube" && props.link  && (
        <iframe
          className="w-full h-52 mt-3 rounded-lg"
          src={getEmbedUrl(props.link)}
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
        ></iframe>
      )}

      {/* Tweet Embed */}
      {props.type === "tweet" && props.link && (
        <div className="w-full mt-3">
          <blockquote className="twitter-tweet">
            <a href={props.link.replace("x.com", "twitter.com")} target="_blank" rel="noopener noreferrer">
              View Tweet
            </a>
          </blockquote>
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

      {/* Footer (Always at Bottom) */}
      <div className="mt-auto pt-3 text-gray-500 text-sm border-t border-gray-200">
        Added on <span className="font-medium">{props.date}</span>
      </div>
    </div>
  );
};


export default Card;
