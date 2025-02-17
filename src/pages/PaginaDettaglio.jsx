import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLike from "../Components/AppLike";
import * as yup from 'yup';
const apiUrl = import.meta.env.VITE_API_URL;

function PaginaDettaglio() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [giorni, setGiorni] = useState('');
  const [casaSelezionata, setCasaSelezionata] = useState();
  const [flag, setFlag] = useState(0);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { slug } = useParams();

  const validazioneRecensione = yup.object().shape({
    username: yup.string().min(3, "Deve essere minimo di tre lettere").max(255, "È troppo lungo").required("Inserire un nome").matches(/[a-zA-Z]/, "Il nome deve contenere almeno una lettera"),
    user_email: yup.string().required("Email obbligatoria").email("Email non valida"),
    reviewContent: yup.string().min(20, "la recensione deve essere minimo di 20 lettere").max(500, "È troppo lungo").matches(/[a-zA-Z]/, "La recensione deve contenere almeno una lettera"),
    lengthOfDay: yup.number().typeError("Devi inserire un numero").required("Inserire i giorni di permanenza").positive("Deve essere positivo").integer("Deve essere un numero intero").min(1, "Deve essere stato almeno un giorno nella struttura"),
  });

  // funzione di callback axios
  // const createNewReview = () =>{
  //  // faccio il put per mandare la recensione in be

  // };

  // faccio la chiamata axios per prendere i dati in entrata basandomi sull'id dell use params
  const caricoCasa = () => {
    axios.get(`${apiUrl}/boolbnb/${slug}`, { params: { slug } }).then((resp) => {
      setCasaSelezionata(resp.data.data);
      console.log(resp.data.data, "sono pagina dettaglio");
    })
  };

  useEffect(() => {
    caricoCasa();
  }, [slug, flag])

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Recensione inviata:', { name, email, reviewText, giorni });

    // Crea un oggetto con i dati da inviare
    const nuovaRecensione = {
      username: name,
      user_email: email,
      reviewContent: reviewText,
      lengthOfDay: giorni
    };

    try {
      await validazioneRecensione.validate(nuovaRecensione, { abortEarly: false });
      console.log("Dati validi:", nuovaRecensione);
      setErrors({}); // Reset degli errori se la validazione passa
      axios.post(`${apiUrl}/boolbnb/${id}/review`, nuovaRecensione)
        .then(resp => {
          console.log(resp.data);
          console.log(casaSelezionata, "log di casa selezionata");



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
    } catch (err) {
      const errorMessages = {};

      if (err.inner) {
        err.inner.forEach((error) => {
          errorMessages[error.path] = error.message;
          console.log(errorMessages);
        });
      } else {
        // Se err.inner non esiste, gestiamo l'errore singolo
        errorMessages[err.path] = err.message;
      }


      setErrors(errorMessages);
    }


  };



  return (
    <>
      <section className="container">
        <button onClick={() => navigate(-1)}>Indietro</button>
        <h3>sono pagina dettaglio {slug}</h3>

        {/* Controlla se la casa è stata caricata */}
        {casaSelezionata ? (
          <div key={casaSelezionata.id}>
            <h4>{casaSelezionata.title}</h4>
            <div>{casaSelezionata.address}</div>
            <div>{casaSelezionata.city}</div>
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
            />{errors.username && <p>{errors.username}</p>}
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
          {errors.user_email && <p>{errors.user_email}</p>}
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
          {errors.lengthOfDay && <p>{errors.lengthOfDay}</p>}

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
          {errors.reviewContent && <p>{errors.reviewContent}</p>}

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
        <AppLike flag={flag} setFlag={setFlag} id={slug}></AppLike>
      </section>
    </>
  )

}
export default PaginaDettaglio;

