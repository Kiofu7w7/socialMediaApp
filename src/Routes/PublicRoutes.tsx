import React from "react";
import { Navigate } from "react-router-dom";

interface PublicRouterProps {
    isAutentication: any;
    children: any;
}

const PublicRouter = ({ isAutentication, children }: PublicRouterProps) => {
    return !isAutentication ? children : <Navigate to="/home" />;
};

export default PublicRouter;