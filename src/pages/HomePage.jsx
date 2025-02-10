import { useState } from "react";

function HomePage() {
//  creo un array simulato per simulare il funzionamento della searchbar
const cities = [
    { name: 'Roma', country: 'Italia' },
    { name: 'Milano', country: 'Italia' },
    { name: 'Londra', country: 'Regno Unito' },
    { name: 'Parigi', country: 'Francia' },
    { name: 'New York', country: 'USA' },
    { name: 'Los Angeles', country: 'USA' }
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
    filtroCittà.map((city, index) =>(
        <div key={index}>{city.name} - {city.country} </div>
    ))
) : ( <p>nessuna casa trovata in questa città</p> ) }


</>

)


};

export default HomePage;


