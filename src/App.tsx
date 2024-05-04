import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import List from "./pages/List";
import Profile from "./pages/Profile";

import "./App.css";

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
      <BrowserRouter>
        <Routes>
          <Route index element={<List />} />
          <Route path="profile/:username" element={<Profile />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
