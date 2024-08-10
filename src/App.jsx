import "./App.css";
import { Route, Routes } from "react-router-dom";
import { useCurrentUser } from "./hooks/query/user";
import Signin from "./screens/Signin";
import Signup from "./screens/Signup";
import Home from "./screens/Home/Home";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const { user } = useCurrentUser();

  return (
    <>
      <div className="fixed top-0 -z-10 h-full w-full">
        <div className="relative h-full w-full bg-slate-950">
          <div className="absolute bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
          <div className="absolute bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle_farthest-side,rgba(255,0,182,.15),rgba(255,255,255,0))]"></div>
        </div>
      </div>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Home userProfile={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </>
  );
}

export default App;
