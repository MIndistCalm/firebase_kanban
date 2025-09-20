import { Navigate } from 'react-router-dom';
import { Spin } from 'antd';
import { useAppSelector } from '../hooks/redux';
import type { ReactNode } from 'react';
import '../styles/protectedroute.css';

interface ProtectedRouteProps {
    children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { user, loading } = useAppSelector((state) => state.auth);

    if (loading) {
        return (
            <div className="protectedroute-loading">
                <Spin size="large" />
            </div>
        );
    }

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};