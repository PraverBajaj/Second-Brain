import { FaLink } from "react-icons/fa6";

interface Props {
  selected: boolean;
}

const Link = ({ selected }: Props) => {
  return (
    <div
      className={`ml-10 flex items-center gap-4 mt-10 cursor-pointer transition-all duration-300 
      ${
        selected
          ? "text-black scale-105 font-medium"
          : "text-gray-400 hover:text-black hover:scale-105"
      }`}
    >
      <FaLink size={20} />
      <div>Link</div>
    </div>
  );
};

export default Link;
