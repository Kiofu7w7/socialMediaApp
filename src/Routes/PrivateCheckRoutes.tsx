import { Navigate } from "react-router-dom";

interface PrivadeCheckRouterProps {
    isAutentication: any;
    children: any;
}

const PrivateCheckRouter = ({ isAutentication, children }: PrivadeCheckRouterProps) => {
    return isAutentication === true ? children : <Navigate to="/newcomer" />;
};

export default PrivateCheckRouter;