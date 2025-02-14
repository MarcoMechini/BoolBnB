import { useState } from "react";
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
    }
];

function AppNavbar() {
    const [isDropdownOpen, setDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <div className={styles.navbarMenu}>
                {navMenu.map(curLink => (
                    <NavLink
                        className={`${styles.buttonNavbar}`}
                        to={curLink.path}
                        key={curLink.title}
                    >
                        {curLink.title}
                    </NavLink>
                ))}
            </div>


            <div className={styles.dropdown}>
                <button onClick={toggleDropdown} className={`${styles.buttonNavbar}`}>
                    Menu
                </button>
                {isDropdownOpen && (
                    <div className={styles.dropdownContent}>
                        {navMenu.map(curLink => (
                            <NavLink
                                to={curLink.path}
                                key={curLink.title}
                                className={styles.buttonNavbar}>
                                {curLink.title}
                            </NavLink>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

export default AppNavbar;
