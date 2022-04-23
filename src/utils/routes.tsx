import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../services/reducers/auth";
import {FC, ReactElement} from "react";

type TRouteProps = {
    children: ReactElement
}

type LocationProps = {
    state: {
        from?: string
    }
}

export const PublicRoute: FC<TRouteProps> = ({children}) => {
    const isAuth = useSelector(selectIsAuth)
    const {state} = useLocation() as LocationProps

    return isAuth ? (<Navigate to={state?.from || "/"}/>) : children
}

export const ProtectedRoute: FC<TRouteProps> = ({children}) => {
    const location = useLocation()
    const isAuth = useSelector(selectIsAuth)

    return isAuth ? children : (<Navigate to="/login" state={{from: location.pathname}}/>)
}