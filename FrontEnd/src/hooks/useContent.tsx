import axios from "axios";
import { useEffect, useState } from "react";
import { Backend_URL } from "../config";
export function useContent() {
  const [contents, setContents] = useState([]);

  const fetchContent = async () => {
    try {
      const response = await axios.get(`${Backend_URL}/user/getcontent`, {
        withCredentials: true,
      });
      setContents(response.data.Content);
    } catch (error) {
      console.error("Error fetching content:", error);
    }
  };

  useEffect(() => {
    fetchContent();
    const interval = setInterval(fetchContent, 1000);
    return () => clearInterval(interval);
  }, []);

  return { contents, fetchContent };
}
