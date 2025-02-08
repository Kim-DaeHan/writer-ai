import { useState, useEffect } from "react";

export function Popup() {
  const [content, setContent] = useState<string>("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getCurrentTab = async () => {
      const [tab] = await chrome.tabs.query({
        active: true,
        currentWindow: true,
      });

      if (tab.id) {
        try {
          const response = await chrome.tabs.sendMessage(tab.id, {
            action: "getPageContent",
          });
          setContent(response.content || "No content found");
        } catch (error) {
          console.error("Error:", error);
          setContent(`Failed to load content: ${error}`);
        }
      }
      setIsLoading(false);
    };

    getCurrentTab();
  }, []);

  return (
    <div className="w-[400px] h-[600px] p-4 overflow-auto">
      <h1 className="text-xl font-bold mb-4">Page Content</h1>
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
        </div>
      ) : (
        <div className="whitespace-pre-wrap">{content}</div>
      )}
    </div>
  );
}
