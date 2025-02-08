import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Popup } from "./popup/Popup";

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Popup />
    </QueryClientProvider>
  );
}

export default App;
