
const NotFound = () => {
    return (
        <div style={{textAlign: 'center', marginTop: '50px'}}>
            <h1 style={{fontSize: '12rem', color: 'red'}}>404</h1>
            <h3 style={{fontSize: '2rem'}}>Oops! La pagina che cerchi non esiste</h3>
            <p style={{marginTop: '20px', fontSize: '1.5rem'}}>Torna alla <a href="/" style={{color: 'blue'}}>homepage</a></p>
        </div>
    );
};

export default NotFound;