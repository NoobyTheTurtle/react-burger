import {Navigate, useLocation} from "react-router-dom";
import PropTypes from "prop-types";
import {useSelector} from "react-redux";
import {selectIsAuth} from "../services/reducers/auth";

export const PublicRoute = ({children}) => {
    const isAuth = useSelector(selectIsAuth)
    const {state} = useLocation()

    return isAuth ? (<Navigate to={state?.from || "/"}/>) : children
}

PublicRoute.propTypes = {
    children: PropTypes.element.isRequired
}

export const ProtectedRoute = ({children}) => {
    const location = useLocation()
    const isAuth = useSelector(selectIsAuth)

    return isAuth ? children : (<Navigate to="/login" state={{from: location.pathname}}/>)
}

PublicRoute.propTypes = {
    children: PropTypes.element.isRequired
}