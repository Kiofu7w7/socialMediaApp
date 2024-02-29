import { Navigate } from "react-router-dom";

interface PrivadeRouterProps {
    isAutentication: any;
    children: any;
}

const PrivateRouter = ({ isAutentication, children }: PrivadeRouterProps) => {
    return isAutentication ? children : <Navigate to="/login" />;
};

export default PrivateRouter;