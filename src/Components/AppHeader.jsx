import { NavLink } from 'react-router-dom';
import styles from './AppHeader.module.css';
import AppNavbar from './AppNavbar';



function AppHeader() {
    return (
        <>
            <header className={`${styles.Header}`}>
                <div><NavLink to='/'><img className={`${styles.logo}`} src="/img/Boolbnb_logo_official.png" alt="logo" /></NavLink></div>
                <div> <AppNavbar /> </div>
            </header>
        </>
    )

}

export default AppHeader;