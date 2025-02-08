import { useState } from "react";

export function Popup() {
  const [count, setCount] = useState(0);

  return (
    <div className="w-[300px] p-4">
      <h1 className="text-xl font-bold mb-4">Chrome Extension Popup</h1>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded"
        onClick={() => setCount((count) => count + 1)}
      >
        count is {count}
      </button>
    </div>
  );
}
