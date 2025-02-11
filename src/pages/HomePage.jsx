import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function HomePage() {

    // CREO LO USE STATE PER LA SEARCHBAR
    const [search, setSearch] = useState("");
    const [filtroCittà, setFiltroCittà] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        caricamentoDati();
    }, []);

    const caricamentoDati = () => {
        axios.get('http://localhost:4000/boolbnb').then((resp) => {
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

        navigate("/Ricerca", { state: { filtroCittà: filtro } });
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

                {filtroCittà.length > 0 ? (
                    filtroCittà.map((curCasa) => (
                        // qui dentro svilupperò la card delle case
                        <div key={curCasa.id}>
                            <div>{curCasa.city}</div>
                            <div>{curCasa.address}</div>
                            <div>{curCasa.title}</div>
                            <div>{curCasa.descr}</div>
                            <div>Stanze:{curCasa.rooms}</div>
                            <div>Bagni:{curCasa.bathrooms}</div>
                            <div>Camere da letto: {curCasa.bedrooms}</div>
                            <div>{curCasa.squere_meters}</div>
                            <div>Like{curCasa.likes}</div>
                            <div>{curCasa.url_img}</div>
                            <Link to={`/Ricerca/${curCasa.id}`}>INFO</Link> 
                            </div>
                    ))
                ) : (<p>nessuna casa trovata in questa città</p>)}


            </section>

        </>

    )


};

export default HomePage;


