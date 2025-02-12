import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
const apiUrl = import.meta.env.VITE_API_URL;

function PaginaDettaglio() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [giorni, setGiorni] = useState('');
  const [casaSelezionata, setCasaSelezionata] = useState();
  const navigate = useNavigate();
  const { id } = useParams();
  


  // faccio la chiamata axios per prendere i dati in entrata basandomi sull'id dell use params
  const caricoCasa = () => {
    axios.get(`http://localhost:4000/boolbnb/${id}`, { params: { id } }).then((resp) => {
      setCasaSelezionata(resp.data.data);
      console.log(resp.data.data, "sono pagina dettaglio");
    })
  };

  useEffect(() => {
    caricoCasa();
  }, [id])

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Recensione inviata:', { name, email, reviewText, giorni });

// Crea un oggetto con i dati da inviare
const nuovaRecensione = {
  username: name,         
  user_email: email,           
  reviewContent: reviewText, 
  lengthOfDay: giorni  
};

// faccio il put per mandare la recensione in be
axios.post(`http://localhost:4000/boolbnb/${id}/review`, nuovaRecensione)
.then(resp => {
  console.log(resp.data);
  console.log(casaSelezionata,"log di casa selezionata" );
  
  
  
  // Resetta i campi del form dopo l'invio
  setName('');
  setEmail('');
  setReviewText('');
  setGiorni('');
  caricoCasa();
})
.catch(err => {
  console.log(err);
});
};



  return (
    <>
      <section className="container">
      <button onClick={() => navigate(-1)}>Indietro</button>
        <h3>sono pagina dettaglio {id}</h3>

        {/* Controlla se la casa è stata caricata */}
        {casaSelezionata ? (
          <div key={casaSelezionata.id}>
            <h4>{casaSelezionata.title}</h4>
          </div>
        ) : (
          <p>Caricamento della casa in corso...</p>
        )}



        <form >
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
            <label htmlFor="giorni">Giorni di soggiorno:</label>
            <input
              type="number"
              id="giorni"
              name="giorni"
              value={giorni}
              onChange={(e) => setGiorni(e.target.value)}
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

          <button onClick={handleSubmit} type="submit">Invia Recensione</button>
        </form>

      </section>
      {/* review section */}

      <section>
        {casaSelezionata && casaSelezionata.reviews.map((curRecensione, index) => (
          <div key={index}>
          <div >{curRecensione.username}</div>
          <div>Notti trascorse:{curRecensione.length_of_stay}</div>
          <div><strong>Recensione</strong></div>
          <div>{curRecensione.review_content}</div>
          </div>
        ))}
      </section>
    </>
  )

}
export default PaginaDettaglio;

