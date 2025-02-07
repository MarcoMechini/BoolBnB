import { NavLink } from "react-router-dom";
import styles from './AppNavbar.module.css';

const navMenu = [
    {
        path: '/',
        title: 'Home'
    },
    {
        path: '/Ricerca',
        title: 'Ricerca'
    },
    {
        path: '/Inserimento',
        title: 'Inserimento'
    }]


function AppNavbar() {

    return (
        <>
            {navMenu.map(curLink => (
                <NavLink className={`${styles.navbar}`} to={curLink.path} key={curLink.title}>{curLink.title}</NavLink>
            ))}
        </>
    )
}

export default AppNavbar