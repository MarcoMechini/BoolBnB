import { Outlet } from "react-router-dom";
import AppFooter from "../Components/AppFooter";
import AppHeader from "../Components/AppHeader";
import AppNavbar from "../Components/AppNavbar";

function AppLayout() {
    return (

        <>
            <AppNavbar />
            <AppHeader />
            <Outlet />
            <AppFooter />

        </>
    )



}

export default AppLayout;