import axios from "axios";
import { useEffect, useState } from "react";
export function useContent() {
  const [contents, setContents] = useState([]);

  const fetchContent = async () => {
    try {
      const response = await axios.get(`/api/user/getcontent`, {
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
