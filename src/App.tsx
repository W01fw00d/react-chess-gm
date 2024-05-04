import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import "./App.css";
import List from "./pages/List";

// TODO: ideally, this constant should be stored on an environment variable, not commited to the repository:
const API_BASE_URL = "https://api.chess.com/pub";

const queryFn = async ({ queryKey }: { queryKey: any }) => {
  const response = await fetch(`${API_BASE_URL}/${queryKey[0]}`);

  return response.json();
};

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn,
    },
  },
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <List />
    </QueryClientProvider>
  );
};

export default App;
