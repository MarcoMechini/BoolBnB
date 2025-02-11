import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function PaginaDettaglio() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [casaSelezionata, setCasaSelezionata] = useState(null);
    const navigate = useNavigate()
    const { id } = useParams()


// faccio la chiamata axios per prendere i dati in entrata basandomi sull'id dell use params
const caricoCasa = () => {
  axios.get(`http://localhost:4000/boolbnb/${id}`, { params: { id } }).then((resp) => {
    setCasaSelezionata (resp.data.data); 
  })
};

useEffect(()=> {
    caricoCasa();
},[id])


     // Funzione per gestire l'invio del form
  const handleSubmit = (e) => {
    e.preventDefault(); 

    console.log('Recensione inviata:', { name, email, reviewText });

    // Resetta i campi del form dopo l'invio
    setName('');
    setEmail('');
    setReviewText('');
  };




    return (
        <>
        <section className="container">
        <button onClick={() => navigate(-1)}>Indietro</button>
            <h3>sono pagina dettaglio {id}</h3>
    
                {/* Controlla se la casa è stata caricata */}
                {casaSelezionata ? (
                <div>
                    <h4>{casaSelezionata.title}</h4> 
                    
                </div>
            ) : (
                <p>Caricamento della casa in corso...</p>
            )}


        
            <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Nome:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div>
        <label htmlFor="reviewText">Recensione:</label>
        <textarea
          id="reviewText"
          value={reviewText}
          name="reviewText"
          onChange={(e) => setReviewText(e.target.value)}
          required
        />
      </div>

      <button type="submit">Invia Recensione</button>
    </form>

</section>
        </>
    )

}

export default PaginaDettaglio;

