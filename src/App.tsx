import Navbar from "@/components/ui/navbar";
import { Toaster } from "@/components/ui/toaster";
import { BrowserRouter as Router } from "react-router-dom";
import AuthProvider from "./providers/auth.provider";
import RoutesComponent from "./routes";
const App = () => {
  return (
    <div className="font-montserrat">
      <AuthProvider>
        <Router>
          <Toaster />
          <Navbar />
          <RoutesComponent />
        </Router>
      </AuthProvider>
    </div>
  );
};

export default App;
