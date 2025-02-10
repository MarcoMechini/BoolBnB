import { useState } from "react";
import { Link } from "react-router-dom";

function HomePage() {
//  creo un array simulato per simulare il funzionamento della searchbar
const cities = [
    { name: 'Roma', country: 'Italia', id:1 },
    { name: 'Milano', country: 'Italia',id:2 },
    { name: 'Londra', country: 'Regno Unito',id:3 },
    { name: 'Parigi', country: 'Francia',id:4 },
    { name: 'New York', country: 'USA',id:5 },
    { name: 'Los Angeles', country: 'USA',id:6 }
  ];

// CREO LO USE STATE PER LA SEARCHBAR
const [search, setSearch] = useState("");
const [filtroCittà, setFiltroCittà] = useState(cities);


// filtro le città in base al termine di ricerca
const ricercaManuale = () => { 
    const filtro = cities.filter(city =>
    city.name.toLocaleLowerCase().includes(search.toLocaleLowerCase())
);
setFiltroCittà(filtro)
setSearch("");
};





return(
<>

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
    filtroCittà.map((city) =>(
        // qui dentro svilupperò la card delle case
        
        <div key={city.id}><Link to={`/Ricerca/${city.id}`}>{city.name} - {city.country}</Link> </div>
    ))
) : ( <p>nessuna casa trovata in questa città</p> ) }


</>

)


};

export default HomePage;


