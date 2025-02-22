import { useRef, useState } from "react";
import Button from "./Button";
import { IoClose } from "react-icons/io5";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Backend_URL } from "../../config";

interface CreateContentModelProps {
  openmode: boolean;
  closeModel: () => void;
}

const CreateContentModel = ({
  openmode,
  closeModel,
}: CreateContentModelProps) => {
  const navigate = useNavigate();
  const titleRef = useRef<HTMLInputElement>(null);
  const subheadingRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const additionalRef = useRef<HTMLTextAreaElement>(null);

  const [type, setType] = useState("other");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [titleError, setTitleError] = useState("");
  const [subheadingError, setSubheadingError] = useState("");

  async function submit() {
    const title = titleRef.current?.value.trim();
    const link = linkRef.current?.value.trim();
    const payload = additionalRef.current?.value.trim();
    const subheading = subheadingRef.current?.value.trim();

    if (!title) {
      setError("Title is required");
      return;
    }

    // Prevent submission if errors exist
    if (titleError || subheadingError) {
      setError("Please fix input errors before submitting.");
      return;
    }

    setIsLoading(true);

    try {
      const contentData = { title, link, payload, subheading, type };

      await axios.post(`${Backend_URL}/user/addcontent`, contentData, {
        withCredentials: true,
      });

      setIsLoading(false);
      closeModel();
      setError("");
    } catch (error: any) {
      setIsLoading(false);

      if (error.response?.status === 401) {
        navigate("/signin");
        alert("You are not signed in");
        return;
      }

      console.error("Error adding content:", error);
      alert("Failed to add content. Please try again.");
    }
  }

  return (
    <div>
      {openmode && (
        <div className="fixed top-0 left-0 w-full h-full bg-[rgba(0,0,0,0.5)] flex justify-center items-center transition-all duration-300">
          <div className="flex flex-col w-96 border border-gray-300 rounded-2xl shadow-xl p-6 gap-5 bg-white">
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

            {/* Input */}
            <input
              ref={titleRef}
              className={`p-2 rounded border ${
                titleError ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              placeholder="Enter Title *"
              required
              onChange={(e) =>
                setTitleError(
                  e.target.value.length > 14 ? "Max 14 characters allowed" : ""
                )
              }
            />
            {titleError && <p className="text-red-500 text-sm">{titleError}</p>}

            <input
              ref={subheadingRef}
              className={`p-2 rounded border ${
                subheadingError ? "border-red-500" : "border-gray-300"
              }`}
              type="text"
              placeholder="Enter Subheading (Optional)"
              onChange={(e) =>
                setSubheadingError(
                  e.target.value.length > 14 ? "Max 14 characters allowed" : ""
                )
              }
            />
            {subheadingError && (
              <p className="text-red-500 text-sm">{subheadingError}</p>
            )}

            <input
              ref={linkRef}
              className="p-2 rounded border border-gray-300"
              type="text"
              placeholder="Enter Link (Required for YouTube and Tweets)"
            />

            <textarea
              ref={additionalRef}
              className="p-2 rounded border border-gray-300"
              placeholder="Additional Text (Optional)"
              rows={3}
            ></textarea>

            <Button
              varient="primary"
              text={isLoading ? "Submitting..." : "Submit"}
              size="sm"
              onClick={submit}
              disabled={isLoading || !!titleError || !!subheadingError}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CreateContentModel;
