import { LuGalleryHorizontalEnd } from "react-icons/lu";

interface Props {
  selected: boolean;
}

const AllNotes = ({ selected }: Props) => {
  return (
    <div
      className={`ml-10 flex items-center gap-4 mt-10 cursor-pointer transition-all duration-300 
      ${
        selected
          ? "text-black scale-105 font-medium"
          : "text-gray-400 hover:text-black hover:scale-105"
      }`}
    >
      <LuGalleryHorizontalEnd size={20} />
      <div>All Notes</div>
    </div>
  );
};

export default AllNotes;
