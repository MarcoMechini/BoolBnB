
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import AppLike from "../Components/AppLike";
import styles from './PaginaRicerca.module.css';
import { set } from "react-hook-form";
const apiUrl = import.meta.env.VITE_API_URL


function PaginaRicerca() {

    const location = useLocation();
    const initialFilters = {
        city: location.state?.city || [],
        bedrooms: '',
        bathrooms: '',
        id_property: 0,
    }


    const [filtroCittà, setFiltroCittà] = useState(location.state?.filtroCittà || [])
    const navigate = useNavigate()
    const [filter, setFilter] = useState(initialFilters)
    const [property, setProperty] = useState([])
    const [flag, setFlag] = useState(0);

    const handleInputChange = (e) => {
        setFilter({ ...filter, [e.target.name]: e.target.value })
    }

    useEffect(() => {
        axios.get(`${apiUrl}/boolbnb/property`).then(resp => {
            setProperty(resp.data.data)
        }).catch(err => {
            console.log(err);
            setProperty([])
        });
    }, [flag])

    //stanze posti letto e tipo immobile
    const ricercaMulti = () => {

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
        if (filter.city !== '' || filter.bedrooms !== '' || filter.bathrooms !== '' || filter.id_property > 0) {
            url += '?'
        }

        // concateno all'url i parametri uniti dall'end logico
        if (filtersArr) {
            url += filtersArr.join('&')
        }

        //chiamata in get con l'url creato precedenemtente
        axios.get(url).then(resp => {

            // salviamo i dati che ci tornano dalla chiamata api nella variabile filtrocittà
            setFiltroCittà(resp.data.data)
            navigate(`/Ricerca?${filtersArr.join('&')}`);
        }).catch(err => {
            console.log(err);
            console.log(filtroCittà);
            setFiltroCittà([])
        });
    }

    return (
        <>
            <section className="container">
                <button className={`${styles.genericButton}`} onClick={() => navigate(-1)}>Indietro</button>
                <div>
                    {/* inizio filtri ricerca avanzata */}
                    <section className={`${styles.rowForm}`}>
                        <div>
                            <label className={`${styles.titleForm}`} htmlFor="city">Città:</label>
                            <input type="text" onChange={handleInputChange} value={filter.city} name="city" id="city" />
                        </div>
                        <div>
                            <label className={`${styles.titleForm}`} htmlFor="bathrooms">Bagni:</label>
                            <input type="number" onChange={handleInputChange} value={filter.bathrooms} name="bathrooms" id="bathrooms" placeholder="0" />
                        </div>
                        <div>
                            <label className={`${styles.titleForm}`} htmlFor="bedrooms">Camere:</label>
                            <input type="number" onChange={handleInputChange} value={filter.bedrooms} name="bedrooms" id="bedrooms" placeholder="0" />
                        </div>
                    </section>
                    <select
                        name="id_property"
                        id="id_property"
                        onChange={handleInputChange}
                        value={filter.id_property}
                    >
                        <option defaultChecked value='0'>Tutte</option>
                        {property.map(curProp => (
                            <option key={curProp.id} value={curProp.id}>{curProp.type}</option>
                        ))}
                    </select>
                    <button className={`${styles.genericButton}`} onClick={ricercaMulti}>Invia</button>
                    {/* fine filtri ricerca avanzata */}
                    <div>

                    </div>
                    <h1 className={`${styles.title}`}>Risultati della ricerca</h1>
                    {filtroCittà.length >= 1 ? (
                        filtroCittà.map((curCasa) => (
                            <div key={curCasa.id}  >
                                <div className={`${styles.card}`}>
                                    <img className={`${styles.colCard1}`} src={`${apiUrl}/images/${curCasa.url_img}`} alt="" />
                                    <div className={`${styles.colCard2}`}>
                                        <div className={`${styles.rowDescr}`}>
                                            <div>Città: <strong>{curCasa.city}</strong> </div>
                                            <div>{curCasa.address}</div>
                                            <div>{curCasa.title}</div>
                                            <div>Camere: {curCasa.rooms}</div>
                                            <div>Letti: {curCasa.bedrooms}</div>
                                            <div>Bagni: {curCasa.bathrooms}</div>
                                        </div>
                                        <div className={`${styles.rowLike}`}>
                                            <Link className={`${styles.infoButton}`} to={`/Ricerca/${curCasa.slug}`}><div className={`${styles.info}`}>INFO</div></Link>
                                            <AppLike flag={flag} setFlag={setFlag} id={curCasa.id}></AppLike></div></div>
                                </div></div>
                        ))
                    ) : (
                        <p className={styles.reset}>Nessuna casa trovata! Usa la ricerca avanzata per trovare quello che cerchi</p>
                    )}
                </div>
            </section>



        </>
    )
}

export default PaginaRicerca