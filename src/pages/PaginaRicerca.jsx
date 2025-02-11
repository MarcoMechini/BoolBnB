
import {  useNavigate, useLocation, Link } from "react-router-dom";




function PaginaRicerca() {

    const location = useLocation();
    const filtroCittà = location.state?.filtroCittà || [];
    const navigate = useNavigate()

    return (
        <>
        <section className="container">
            <h3>sono Pagina Ricerca</h3>
            <button onClick={() => navigate(-1)}>Indietro</button>

            <div>
                <h1>Risultati della ricerca</h1>
                {filtroCittà.length > 0 ? (
                 filtroCittà.map((city) => (
                    <div key={city.id}><Link to={`/Ricerca/${city.id}`}>{city.name} - {city.country}</Link> </div>
                    ))
                ) : (
                    <p>Usa la ricerca vanzata per trovare quello che cerchi</p>
                )}
            </div>
            </section>



        </>
    )
}

export default PaginaRicerca