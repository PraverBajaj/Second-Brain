import Button from "../components/ui/Button";
import { PiShareNetworkBold } from "react-icons/pi";
import { TiPlus } from "react-icons/ti";
import Card from "../components/ui/card";
import Createcontentmodel from "../components/ui/createcontentmodel";
import { useEffect, useState } from "react";
import { Sidebar } from "../components/ui/sidebar";
import { useContent } from "../hooks/useContent";
import { LuBrain } from "react-icons/lu";
import { RxHamburgerMenu } from "react-icons/rx";

const Dashboard = () => {
  const [modelState, setModelState] = useState(false);
  const { contents, fetchContent } = useContent();
  const [filteredData, setFilteredData] = useState([]);
  const [selected, setSelected] = useState("All-Notes");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    fetchContent();
  }, [modelState]);

  useEffect(() => {
    if (selected === "All-Notes") {
      setFilteredData(contents);
    } else {
      // @ts-ignore
      setFilteredData(
        // @ts-ignore
        contents.filter((content) => content.type === selected.toLowerCase())
      );
    }
  }, [contents, selected]);

  // Close sidebar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        sidebarOpen &&
        !event.target.closest(".sidebar-container") &&
        !event.target.closest(".sidebar-toggle")
      ) {
        setSidebarOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [sidebarOpen]);

  return (
    <div className="flex relative">
      {/* Sidebar Toggle */}
      <div
        className="md:hidden fixed top-7 left-7 border bg-[#e1e7ff]  border-[#4f39f6] rounded p-3 z-50 transition-all sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <RxHamburgerMenu className="text-[#4f39f6] text-2xl" />
        </div>
  
        {/* Sidebar */}
        <div
          className={`fixed top-0 left-0 h-screen w-72 bg-white border-r z-40 transition-transform duration-300 ease-in-out sidebar-container ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0`}
        >
          <Sidebar selected={selected} setSelected={setSelected} />
          </div>

{/* Main Content */}
<div className="flex-1 bg-[#f8fbfc] min-h-screen p-8 md:pl-80 transition-all">
  <div className="flex justify-center items-center md:hidden">
    <div className="flex items-center">
      <div className="text-4xl text-[#4f45e4] pr-1.5">
        <LuBrain />
      </div>
      <div className="text-xl font-medium">Second Brain</div>
    </div>
  </div>

  {/* Header (Title + Buttons) */}
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-semibold md:mt-0 mt-18">{selected}</h1>
    <div className="block md:hidden">
      <div className="flex gap-3 mb-12">
        <Button
          varient="secondary"
          size="sm"
          starticon={<PiShareNetworkBold />}
          text="Share "
          onClick={() => alert("Share functionality coming soon!")}
        />
        <Button
          varient="primary"
          size="sm"
          starticon={<TiPlus />}
          text="Add "
          onClick={() => setModelState(true)}
        />
      </div>
    </div>
    <div className="hidden md:block">
      <div className="flex gap-3">
        <Button
          varient="secondary"
          size="sm"
          starticon={<PiShareNetworkBold />}
          text="Share Brain"
          onClick={() => alert("Share functionality coming soon!")}
        />
        <Button
          varient="primary"
          size="sm"
          starticon={<TiPlus />}
          text="Add Content"
          onClick={() => setModelState(true)}
        />
      </div>
    </div>
  </div>

  {/* Create Content Modal */}
  <Createcontentmodel
    openmode={modelState}
    closeModel={() => setModelState(false)}
  />

  {/* Notes Grid */}
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
    {filteredData.length > 0 ? (
      filteredData.map(
        (
          { type, link, title, subheading, payload, createdAt },
          index
        ) => (
          <Card
            key={index}
            type={type}
            title={title}
            link={link}
            Subheading={subheading}
            payload={payload}
            date={new Date(createdAt).toISOString().split("T")[0]}
          />
        )
      )
    ) : (
      <p>No content found for the selected type.</p>
    )}
  </div>
</div>
</div>
);
};

export default Dashboard