import { Navigate, Route, Routes } from "react-router-dom";
import PageNotFound from "./common/PageNotFound";
import Layout from "./layout/Layout";
import Login from "./pages/auth/Login";
import RequireAuth from "./pages/auth/RequireAuth";
import SignupPage from "./pages/auth/Signup";
import Landing from "./pages/landing";
import Admin from "./pages/admin";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Landing />} />

        <Route element={<RequireAuth allowedRoles={"admin"} />}>
          <Route path="/admin/*" element={<Admin />} />
        </Route>

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<SignupPage />} />
        <Route path="/not-found" element={<PageNotFound />} />
        <Route path="*" element={<Navigate to="/not-found" replace />} />
      </Route>
    </Routes>
  );
}

export default App;
