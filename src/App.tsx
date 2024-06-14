import Login from "./components/Login";
import axios from "axios";
import SearchPage from "./components/SearchPage";
import { useState } from "react";


function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const handleLogin = async (name: string, email: string) => {
    try {
      await axios.post(
        "https://frontend-take-home-service.fetch.com/auth/login",
        { name, email },
        { withCredentials: true }
      );
      setAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    // conditionally render SearchPage depending on if user has logged in (i.e. is authenticated)
    <div>
      {authenticated ? <SearchPage /> : <Login onLogin={handleLogin} />}
    </div>
  );
}

export default App;
