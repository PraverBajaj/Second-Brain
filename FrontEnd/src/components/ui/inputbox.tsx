import { useState } from "react";
import { FaChevronDown } from "react-icons/fa"; // Import dropdown arrow icon
import Button from "./Button";

const CardInputForm = ({ onSubmit }: { onSubmit: (data: any) => void }) => {
  const [formData, setFormData] = useState({
    type: "tweet",
    title: "",
    link: "",
    payload: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    if (!formData.title.trim()) {
      alert("Title is required!");
      return;
    }
    if ((formData.type === "youtube" || formData.type === "tweet" || formData.type === "link") && !formData.link.trim()) {
      alert("Link is required for this type!");
      return;
    }
    onSubmit(formData);
  };

  return (
    <div className="max-w-md bg-white shadow-md rounded-lg p-6">
      {/* Type Selector with Dropdown Arrow */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Select Type</label>
      <div className="relative">
        <select
          name="type"
          value={formData.type}
          onChange={handleChange}
          className="w-full p-2 border rounded-md appearance-none pr-10" // appearance-none hides default arrow
        >
          <option value="tweet">Tweet</option>
          <option value="document">Document</option>
          <option value="link">Link</option>
          <option value="youtube">YouTube</option>
          <option value="any">Any</option>
        </select>
        <FaChevronDown className="absolute right-3 top-3 text-gray-500 pointer-events-none" />
      </div>

      {/* Title Input */}
      <label className="block mt-3 mb-2 text-sm font-medium text-gray-700">Title</label>
      <input
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Enter title"
        className="w-full p-2 border rounded-md mb-3"
      />

      {/* Link Input (Shown Conditionally) */}
      {(formData.type === "youtube" || formData.type === "tweet" || formData.type === "link") && (
        <>
          <label className="block mb-2 text-sm font-medium text-gray-700">Link</label>
          <input
            type="text"
            name="link"
            value={formData.link}
            onChange={handleChange}
            placeholder="Enter link"
            className="w-full p-2 border rounded-md mb-3"
          />
        </>
      )}

      {/* Payload Input */}
      <label className="block mb-2 text-sm font-medium text-gray-700">Payload</label>
      <textarea
        name="payload"
        value={formData.payload}
        onChange={handleChange}
        placeholder="Enter additional content"
        className="w-full p-2 border rounded-md mb-3"
      ></textarea>

      {/* Submit Button */}
      <Button varient="primary" size="md" text="Submit" onClick={handleSubmit} />
    </div>
  );
};

export default CardInputForm;
