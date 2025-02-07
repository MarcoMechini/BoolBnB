import { Outlet } from "react-router-dom";
import AppFooter from "../Componenti/AppFooter";
import AppHeader from "../Componenti/AppHeader";

function AppLayout ( ) {
return(

    <>
    <AppHeader />
    <Outlet/>
    <AppFooter/>    
    
    </>
)



}