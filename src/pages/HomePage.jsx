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



    // filtro le città in base al termine di ricerca
    const ricercaManuale = () => {
        const filtro = filtroCittà.filter(casa =>
            casa.city.toLocaleLowerCase().includes(search.toLocaleLowerCase())
        );
        setFiltroCittà(filtro)

        setSearch("");

        navigate("/Ricerca", { state: { filtroCittà: filtro, city: search } });
    };


    return (
        <>
            <section className="container">
                <h1>Home Page</h1>

                {/* barra di ricerca */}
                <input type="text"
                    placeholder="Cerca per città"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)} />
                {/* inserisco bottone ricerca */}

                <button type="button" onClick={ricercaManuale}>Cerca</button>


                {/* risultato ricerca */}
                <section>
                     <div  className={`${styles.row}`}>
                    {filtroCittà.length > 0 ? (
                        filtroCittà.map((curCasa) => (
                            // qui dentro svilupperò la card delle case
                            <div key={curCasa.id} className={`${styles.col}`} >
                            <div  className={`${styles.card}`}>
                            <img className={`${styles.colCard1}`}  src={`${apiUrl}/${curCasa.url_img}`} alt="" />
                                <div className={`${styles.colCard2}`}>
                                    <div className={`${styles.rowDescr}`}>
                                <div>{curCasa.city}</div>
                                <div>{curCasa.address}</div>
                                <div>{curCasa.title}</div>
                                <div>Mq:{curCasa.square_meters}</div>
                                <div>Stanze:{curCasa.rooms}</div>
                                <div>Bagni:{curCasa.bathrooms}</div>
                                <div>Camere da letto: {curCasa.bedrooms}</div>
                                <div>{curCasa.squere_meters}</div>
                                </div>
                                <div className={`${styles.rowLike}`}>
                                <Link to={`/Ricerca/${curCasa.id}`}>INFO</Link>
                                <AppLike flag={flag} setFlag={setFlag} id={curCasa.id}></AppLike></div></div>
                            </div></div>
                        ))
                    ) : (<p>nessuna casa trovata in questa città</p>)}
                    </div>
                </section>
            </section>

        </>

    )


};

export default HomePage;


