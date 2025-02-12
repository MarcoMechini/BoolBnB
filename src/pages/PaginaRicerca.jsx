
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";

const apiUrl = import.meta.env.VITE_API_URL


function PaginaRicerca() {

    const location = useLocation();
    const initialFiletrs = {
        city: location.state?.city || [],
        bedrooms: '',
        bathrooms: '',
        id_property: 0,
    }


    const [filtroCittà, setFiltroCittà] = useState(location.state?.filtroCittà || [])
    const navigate = useNavigate()
    const [filter, setFilter] = useState(initialFiletrs)
    const [property, setProperty] = useState([])

    const handleInputChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        axios.get(`${apiUrl}/boolbnb/property`).then(resp => {
            setProperty(resp.data.data)
        })
    }, [])


    //stanze posti letto e tipo immobile
    const ricercaMulti = () => {

        console.log('filter', filter);

        const filtersArr = []
        console.log(filter);
        let url = `${apiUrl}/boolbnb/search`;

        // inizio popolazione array dei filtri
        if (filter.city) {
            filtersArr.push(`city=${filter.city}`)
        }
        if (filter.bathrooms) {
            filtersArr.push(`bathrooms=${filter.bathrooms}`)
        }
        if (filter.bedrooms) {
            filtersArr.push(`bedrooms=${filter.bedrooms}`)
        }
        if (filter.id_property > 0) {
            filtersArr.push(`id_property=${filter.id_property}`)
        }
        // fine popolazione array dei filtri
        // controllo se ci sono dei filtri ne caso concateno il punto interrogativo all'url per permettere di metter i parametri
        if (filter.city !== '' || filter.bedrooms !== '' || filter.bathrooms !== '' || filter.id_property !== 0) {
            url += '?'
        }

        // concateno all'url i parametri uniti dall'end logico
        if (filtersArr) {
            url += filtersArr.join('&')
        }

        console.log('url', url);


        //chiamata in get con l'url creato precedenemtente
        axios.get(url).then(resp => (
            // salviamo i dati che ci tornano dalla chiamata api nella variabile filtrocittà
            setFiltroCittà(resp.data.data)
        ))

    }

    return (
        <>
            <section className="container">
                <h3>sono Pagina Ricerca</h3>
                <button onClick={() => navigate(-1)}>Indietro</button>

                <div>
                    {/* inizio filtri ricerca avanzata */}
                    <div>
                        <label htmlFor="city"></label>
                        <input type="text" onChange={handleInputChange} value={filter.city} name="city" id="city" />
                    </div>
                    <div>
                        <label htmlFor="bathrooms">Bagni</label>
                        <input type="number" onChange={handleInputChange} value={filter.bathrooms} name="bathrooms" id="bathrooms" placeholder="0" />
                    </div>
                    <div>
                        <label htmlFor="bedrooms">Camere</label>
                        <input type="number" onChange={handleInputChange} value={filter.bedrooms} name="bedrooms" id="bedrooms" placeholder="0" />
                    </div>
                    <select
                        name="id_property"
                        id="id_property"
                        onChange={handleInputChange}
                        value={filter.id_property}
                    >
                        <option key='0' value='0'>Tutte</option>
                        {property.map(curProp => (
                            <option key={curProp.id} value={curProp.id}>{curProp.type}</option>
                        ))}
                    </select>
                    <button onClick={ricercaMulti}>Invia</button>
                    {/* fine filtri ricerca avanzata */}
                    <div>

                    </div>
                    <h1>Risultati della ricerca</h1>
                    {filtroCittà.length > 0 ? (
                        filtroCittà.map((curCasa) => (
                            <div key={curCasa.id}><Link to={`/Ricerca/${curCasa.id}`}>{curCasa.city} - {curCasa.title}</Link> </div>
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