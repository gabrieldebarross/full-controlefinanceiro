import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import NotFound from "../pages/notfound/NotFound";
import Dashboard from "../pages/dashboard/Dashboard";
import { AuthProvider } from "../context/AuthContext";
import PrivateRoute from "../components/routes/PrivateRoute";
import PublicRoute from "../components/routes/PublicRoute";

export default function AppRoutes() {

    return (
        <Router>
            <AuthProvider>
                <Routes>
                    <Route path="/" element={<PublicRoute><Login /></PublicRoute>}></Route>
                    <Route path="/register" element={<PublicRoute><Register /></PublicRoute>}></Route>

                    <Route element={<PrivateRoute />}>
                        <Route path="/dashboard" element={<Dashboard />}></Route>
                    </Route>

                    <Route path="*" element={<NotFound />}></Route>
                </Routes>
            </AuthProvider>
        </Router>
    )
}