import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from './HomePage.module.css';
import AppLike from '../Components/AppLike'


function HomePage() {

    const apiUrl = import.meta.env.VITE_API_URL

    // CREO LO USE STATE PER LA SEARCHBAR
    const [search, setSearch] = useState("");
    const [flag, setFlag] = useState(0);
    const [filtroCittà, setFiltroCittà] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        caricamentoDati();
    }, [flag]);

    const caricamentoDati = () => {
        axios.get(`${apiUrl}/boolbnb`).then((resp) => {
            console.log(resp.data.data);
            setFiltroCittà(resp.data.data);
        })
    };

    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            ricercaManuale();
        }
    };

    // filtro le città in base al termine di ricerca
    const ricercaManuale = () => {
        const filtro = filtroCittà.filter(casa =>
            casa.city.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );
        setFiltroCittà(filtro)

        setSearch("");

        navigate(`/Ricerca?city=${search}`, { state: { filtroCittà: filtro, city: search } });
    };


    return (
        <>
            <section className="container">
                {/* barra di ricerca */}
                <input className={`${styles.searchBar}`}
                    type="text"
                    placeholder="Cerca per città"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyUp={handleKeyUp}
                />
                {/* inserisco bottone ricerca */}
                <button className={`${styles.buttonSearch}`} type="button" onClick={ricercaManuale}>Cerca</button>


                {/* risultato ricerca */}
                <section>
                    <div className={`${styles.row}`}>
                        {filtroCittà.length > 0 ? (
                            filtroCittà.map((curCasa) => (
                                // qui dentro svilupperò la card delle case
                                <div key={curCasa.id} className={`${styles.col}`} >
                                    <div className={`${styles.card}`}>
                                        <img className={`${styles.colCard1}`} src={`${apiUrl}/images/${curCasa.url_img}`} alt="" />
                                        <div className={`${styles.colCard2}`}>
                                            <div className={`${styles.rowDescr}`}>
                                                <div className={`${styles.nomeC}`}>Città:&nbsp; <strong>{curCasa.city}</strong> </div>
                                                <div className={`${styles.indirizzo}`}>Indirizzo:&nbsp;<strong>{curCasa.address}</strong></div>
                                                <div className={`${styles.descr}`}>descrizione: <br /><div className={`${styles.descr2}`}>{curCasa.title}</div></div>
                                            </div>
                                            <div className={`${styles.rowLike}`}>
                                                <Link className={`${styles.infoButton}`} to={`/Ricerca/${curCasa.slug}`}><div className={`${styles.info}`}>INFO</div></Link>
                                                <div className={`${styles.colLike}`}>
                                                    <AppLike flag={flag} setFlag={setFlag} id={curCasa.id}></AppLike>
                                                    <p>{curCasa.likes}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (<p>nessuna casa trovata in questa città</p>)}
                    </div>
                </section>
            </section>

        </>

    )


};

export default HomePage;


