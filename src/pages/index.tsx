import Homepage from "./homepage/homepage";
import NotFound404 from "./not-found-404/not-found-404";
import Login from "./auth/login";
import Register from "./auth/register";
import ForgotPassword from "./auth/forgot-password";
import ResetPassword from "./auth/reset-password";
import Profile from "./profile/profile";
import {Route, Routes, useLocation} from "react-router-dom";
import App from "../components/app/app";
import {ProtectedRoute, PublicRoute} from "../utils/routes";
import React, {useEffect} from "react";
import ProfileForm from "../components/profile-form/profile-form";
import ProfileOrders from "../components/profile-orders/profile-orders";
import {useDispatch} from "../services/types/hooks";
import {getUserThunk} from "../services/actions/auth";
import IngredientDetails from "../components/ingredient-details/ingredient-details";
import IngredientDetailsModal from "../components/ingredient-details/ingredient-details-modal";
import Feed from "./feed/feed";
import OrderDetails from "../components/order-details/order-details";
import OrderDetailsModal from "../components/order-details/order-details-modal";

type LocationProps = {
    state: {
        background?: Location
    }
}

const Pages = () => {
    const dispatch = useDispatch()
    const location = useLocation() as LocationProps
    const background = location.state && location.state.background

    useEffect(() => {
        dispatch(getUserThunk())
    }, [dispatch])

    return (
        <>
            <Routes location={background || location}>
                <Route path="/" element={<App/>}>
                    <Route path="login" element={<PublicRoute outlet={<Login/>}/>}/>
                    <Route path="register" element={<PublicRoute outlet={<Register/>}/>}/>
                    <Route path="forgot-password" element={<PublicRoute outlet={<ForgotPassword/>}/>}/>
                    <Route path="reset-password" element={<PublicRoute outlet={<ResetPassword/>}/>}/>

                    <Route path="profile" element={<ProtectedRoute outlet={<Profile/>}/>}>
                        <Route index element={<ProfileForm/>}/>
                        <Route path="orders" element={<ProfileOrders/>}/>
                    </Route>
                    <Route path="profile/orders/:orderId" element={<ProtectedRoute outlet={<OrderDetails/>}/>}/>

                    <Route index element={<Homepage/>}/>
                    <Route path="/feed">
                        <Route index element={<Feed/>}/>
                        <Route path=":orderId" element={<OrderDetails/>}/>
                    </Route>
                    <Route path="/ingredients/:ingredientId"
                           element={<IngredientDetails title={"???????????? ??????????????????????"}/>}
                    />
                    <Route path="*" element={<NotFound404/>}/>
                </Route>
            </Routes>
            {background && (
                <Routes>
                    <Route path="/ingredients/:ingredientId" element={<IngredientDetailsModal/>}/>
                    <Route path={`${background.pathname}/:orderId`} element={<OrderDetailsModal/>}/>
                </Routes>
            )}
        </>
    )
}

export default Pages