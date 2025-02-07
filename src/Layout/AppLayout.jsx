import { Outlet } from "react-router-dom";
import AppFooter from "../Components/AppFooter";
import AppHeader from "../Components/AppHeader";

function AppLayout() {
    return (

        <>
            <AppHeader />
            <Outlet />
            <AppFooter />

        </>
    )



}

export default AppLayout;