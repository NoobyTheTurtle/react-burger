import {Navigate, useLocation} from "react-router-dom";
import {useSelector} from "../services/types/hooks";
import {selectIsAuth} from "../services/reducers/auth";

type TRouteProps = {
    outlet: JSX.Element
}

type LocationProps = {
    state: {
        from?: string
    }
}

export const PublicRoute = ({outlet}: TRouteProps) => {
    const isAuth = useSelector(selectIsAuth)
    const {state} = useLocation() as LocationProps

    return isAuth ? (<Navigate to={state?.from || "/"}/>) : outlet
}

export const ProtectedRoute = ({outlet}: TRouteProps) => {
    const location = useLocation()
    const isAuth = useSelector(selectIsAuth)

    return isAuth ? outlet : (<Navigate to="/login" state={{from: location.pathname}}/>)
}