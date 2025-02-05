import { LuBrain } from "react-icons/lu";
import Tweet2 from "../icons/tweet2";
import { Sidebaricons } from "./sidebaricons";
import YouTube from "../icons/youtube";
import Link from "../icons/link";
import Document from "../icons/document";
import Other from "../icons/Others";
import AllNotes from "../icons/allnotes";



export const Sidebar = ({ selected, setSelected }:any) => {
  return (
    <div className=" h-screen w-72 fixed top-0 left-0 bg-white border border-r-gray-200 border-t-0">
      <div className="hidden md:block">
      <div className="flex items-center pl-3 pt-3">
      <div className="text-4xl text-[#4f45e4] pr-1.5">
          <LuBrain />
        </div>
        <div className="text-xl font-medium">Second Brain</div>
      </div>
      </div>
 
      <div className="mt-12 md:mt-4 flex flex-col gap-2">
        <Sidebaricons onClick={() => setSelected("All-Notes")} icon={<AllNotes selected={selected === "All-Notes"} />} />
        <Sidebaricons onClick={() => setSelected("Tweet")} icon={<Tweet2 selected={selected === "Tweet"} />} />
        <Sidebaricons onClick={() => setSelected("Youtube")} icon={<YouTube selected={selected === "Youtube"} />} />
        <Sidebaricons onClick={() => setSelected("Document")} icon={<Document selected={selected === "Document"} />} />
        <Sidebaricons onClick={() => setSelected("Link")} icon={<Link selected={selected === "Link"} />} />
        <Sidebaricons onClick={() => setSelected("Other")} icon={<Other selected={selected === "Other"} />} />
      </div>
    </div>
  );
};