import { LuBrain } from "react-icons/lu";
import { IoCloseSharp } from "react-icons/io5";
import Tweet2 from "../icons/tweet2";
import YouTube from "../icons/youtube";
import Link from "../icons/link";
import Document from "../icons/document";
import Other from "../icons/Others";
import AllNotes from "../icons/allnotes";
import { Sidebaricons } from "./sidebaricons";

export const Sidebar = ({ selected, setSelected, setSidebarOpen, sidebarOpen }: any) => {
  return (
    <div
      className={`fixed h-screen w-72 top-0 left-0 bg-white border-r border-gray-200 shadow-lg sidebar-container transform transition-transform ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      {/* Sidebar Header */}
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <div className="text-4xl text-[#4f45e4] pr-1.5">
            <LuBrain />
          </div>
          <div className="text-xl font-medium">Second Brain</div>
        </div>
        <div
          onClick={() => setSidebarOpen(false)}
          className="cursor-pointer text-[#4f45e4] text-2xl md:hidden"
        >
          <IoCloseSharp />
        </div>
      </div>

      {/* Sidebar Menu */}
      <div className="mt-6 flex flex-col gap-2">
        <Sidebaricons
          onClick={() => setSelected("All-Notes")}
          icon={<AllNotes selected={selected === "All-Notes"} />}
        />
        <Sidebaricons
          onClick={() => setSelected("Tweet")}
          icon={<Tweet2 selected={selected === "Tweet"} />}
        />
        <Sidebaricons
          onClick={() => setSelected("Youtube")}
          icon={<YouTube selected={selected === "Youtube"} />}
        />
        <Sidebaricons
          onClick={() => setSelected("Document")}
          icon={<Document selected={selected === "Document"} />}
        />
        <Sidebaricons
          onClick={() => setSelected("Link")}
          icon={<Link selected={selected === "Link"} />}
        />
        <Sidebaricons
          onClick={() => setSelected("Other")}
          icon={<Other selected={selected === "Other"} />}
        />
      </div>
    </div>
  );
};
