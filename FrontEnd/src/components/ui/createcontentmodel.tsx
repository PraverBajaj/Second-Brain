import { useRef, useState } from "react";
import Button from "./Button";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { Backend_URL } from "../../config";
import { useNavigate } from "react-router-dom";


interface CreateContentModelProps {
  openmode: boolean;
  closeModel: () => void;
}

const CreateContentModel = ({
  openmode,
  closeModel,
}: CreateContentModelProps) => {
  const Navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const subheadingRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const additionalRef = useRef<HTMLTextAreaElement>(null);

  const [type, setType] = useState("other");
  const [error, setError] = useState(""); // State to handle error messages

  async function submit() {
    const title = titleRef.current?.value.trim(); // Trim whitespace from the title
    const link = linkRef.current?.value.trim();
    const payload = additionalRef.current?.value.trim();
    const subheading = subheadingRef.current?.value.trim();

    // Validate the title field
    if (!title) {
      setError("Title is required"); // Set error message if title is empty
      return; // Stop the function if title is empty
    }

    try {
      const contentData = {
        title,
        link,
        payload,
        subheading,
        type,
      };

      await axios.post(`${Backend_URL}/user/addcontent`, contentData, {
        withCredentials: true,
      });
      closeModel(); // Close the modal on successful submission
      setError(""); // Clear any previous error messages
    } catch (error: any) {
      if (error.response.status === 401) {
        Navigate("/signin");
        alert("You are not Signed in");
        return;
      }
      console.error("Error adding content:", error);
      alert("Failed to add content. Please try again.");
      Navigate("/signin");
    }
  }

  return (
    <div>
      {openmode && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center transition-all duration-300">
          <div className="flex flex-col w-96 border border-gray-300 rounded-2xl shadow-xl p-6 gap-5 bg-white">
            {/* Header */}
            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-xl">Add Content</h2>
              <button
                onClick={closeModel}
                className="text-gray-600 hover:text-red-500"
              >
                <IoClose size={26} />
              </button>
            </div>

            {/* Error Message */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Type Selection */}
            <select
              className="p-2 rounded border border-gray-300 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
              value={type}
              onChange={(e) => setType(e.target.value)}
            >
              <option value="tweet">Tweet</option>
              <option value="youtube">YouTube</option>
              <option value="document">Document</option>
              <option value="link">Link</option>
              <option value="other">Other</option>
            </select>

            {/* Inputs */}
            <input
              ref={titleRef}
              className="p-2 rounded border border-gray-300"
              type="text"
              placeholder="Enter Title *"
              required
            />
            <input
              ref={subheadingRef}
              className="p-2 rounded border border-gray-300"
              type="text"
              placeholder="Enter Subheading (Optional)"
            />
            <input
              ref={linkRef}
              className="p-2 rounded border border-gray-300"
              type="text"
              placeholder="Enter Link (Optional)"
            />
            <textarea
              ref={additionalRef}
              className="p-2 rounded border border-gray-300"
              placeholder="Additional Text (Optional)"
              rows={3}
            ></textarea>

            {/* Submit Button */}
            <Button
              varient="primary"
              text="Submit"
              size="sm"
              onClick={submit}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModel;