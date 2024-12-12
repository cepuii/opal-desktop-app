import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import "./App.css";
import AuthButton from "./components/global/auth-button";
import Widget from "./components/global/widget";
import ControlLayout from "./layouts/ControlLayout";

const client = new QueryClient();
function App() {
  return (
    <QueryClientProvider client={client}>
      <ControlLayout>
        <AuthButton />
        <Widget />
        Main page
      </ControlLayout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
