import styles from './AppHeader.module.css';
import AppNavbar from './AppNavbar';



function AppHeader() {
    return (
        <>
        <header className={`${styles.Header}`}>
            <div>
         <AppNavbar /> </div>
            <h3 >sono Header</h3>
            <div>logo</div>
            </header>
        </>
    )

}

export default AppHeader;