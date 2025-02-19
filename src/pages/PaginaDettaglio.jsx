import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import AppLike from "../Components/AppLike";
import * as yup from 'yup';
const apiUrl = import.meta.env.VITE_API_URL;
import style from './PaginaDettaglio.module.css';
import { useGlobalContext } from "../context/GlobalContext";
import AppAlertMessage from "../Components/AppAlertMessage";

const initialContactData = {
  name: "",
  sender: "",
  message: ""
};

function PaginaDettaglio() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [giorni, setGiorni] = useState('');
  const [casaSelezionata, setCasaSelezionata] = useState();
  const [flag, setFlag] = useState(0);
  const [errors, setErrors] = useState({});
  const { slug } = useParams();
  const [FormVisibile, setFormVisibile] = useState(false);
  const [formContact, setFormContact] = useState(initialContactData);
  const [contactErrors, setContactErrors] = useState({});
  const { message, setMessage } = useGlobalContext();

  // FUNZIONI PER APRIRE E CHIUDERE IL FORM

  const handleKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleContactSubmit(e);
    }
  };

  const handleReviewKeyUp = (e) => {
    if (e.key === 'Enter') {
      handleSubmit(e);
    }
  };

  const clickVisibile = () => {
    setFormVisibile(true);
  };

  const clickInvisibile = () => {
    setFormVisibile(false);
  };

  const resetAlertMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
    clickInvisibile();
  }

  //Funzione per validare il form "Contattaci"
  const handleContactSubmit = (e) => {
    e.preventDefault();

    const errors = {};

    console.log(formContact.name);
    if (!formContact.name || !formContact.name.trim()) {
      errors.name = "Il nome è obbligatorio";
    } else if (formContact.name.length < 3) {
      errors.name = "Il nome deve avere almeno 3 caratteri";
    }

    if (!formContact.sender || !formContact.sender.trim()) {
      errors.sender = "L'email è obbligatoria";
    } else if (!/\S+@\S+\.\S+/.test(formContact.sender)) {
      errors.sender = "L'email non è valida";
    }

    if (!formContact.message || !formContact.message.trim()) {
      errors.message = "Il messaggio è obbligatorio";
    } else if (formContact.message.length < 10) {
      errors.message = "Il messaggio deve avere almeno 10 caratteri";
    }

    if (Object.keys(errors).length > 0) {
      setContactErrors(errors);
      return;
    }

    // Reset degli errori e invio dei dati
    setContactErrors({});
    console.log("Dati inviati:", formContact);

    // Reset dei campi dopo l'invio


    axios.post(`${apiUrl}/boolbnb/${slug}/contact`, formContact).then(resp => {
      setFormContact(initialContactData);
      console.log('log dentro axios', resp.data);
      // metterli un timer per far sparire il messaggio
      setMessage({ type: 'success', text: 'Dati inviati con successo!' });
      resetAlertMessage();
    }).catch(err => {
      // metterli un timer per far sparire il messaggio
      setMessage({ type: 'error', text: 'Errore nell\'invio dei dati.' });
      resetAlertMessage();
      console.log(err);
    })
  };


  const validazioneRecensione = yup.object().shape({
    username: yup.string().min(3, "Deve essere minimo di tre lettere").max(255, "È troppo lungo").required("Inserire un nome").matches(/[a-zA-Z]/, "Il nome deve contenere almeno una lettera"),
    user_email: yup.string().required("Email obbligatoria").email("Email non valida"),
    reviewContent: yup.string().min(20, "la recensione deve essere minimo di 20 lettere").max(500, "È troppo lungo").matches(/[a-zA-Z]/, "La recensione deve contenere almeno una lettera"),
    lengthOfDay: yup.number().typeError("Devi inserire un numero").required("Inserire i giorni di permanenza").positive("Deve essere positivo").integer("Deve essere un numero intero").min(1, "Deve essere stato almeno un giorno nella struttura"),
  });

  // faccio la chiamata axios per prendere i dati in entrata basandomi sull'id dell use params
  const caricoCasa = () => {
    axios.get(`${apiUrl}/boolbnb/${slug}`).then((resp) => {
      setCasaSelezionata(resp.data.data);
      console.log(resp.data.data, "sono pagina dettaglio");
    })
  };

  useEffect(() => {
    caricoCasa();
  }, [slug, flag])

  const handleChange = e => {
    setFormContact({ ...formContact, [e.target.name]: e.target.value });
  }

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
      axios.post(`${apiUrl}/boolbnb/${slug}/review`, nuovaRecensione)
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
      <AppAlertMessage message={message} />
      <section className="container">
        <div className={`${style.row}`}>
          {/* Controlla se la casa è stata caricata */}
          {casaSelezionata ? (

            <div className={`${style.col}`}>
              <div className={`${style.card}`} key={casaSelezionata.id}>
                <img className={`${style.colCard1}`} src={`${apiUrl}/images/${casaSelezionata.url_img}`} alt="" />
                <div className={`${style.colCard2}`}>
                  <h4>{casaSelezionata.title}</h4>
                  <div>{casaSelezionata.address}</div>
                  <div>{casaSelezionata.city}</div>
                  <div>Mq:{casaSelezionata.square_meters}</div>
                  <div>Stanze da Letto: {casaSelezionata.rooms}</div>
                  <div>letti: {casaSelezionata.bedrooms}</div>
                  <div>Bagni: {casaSelezionata.bathrooms}</div>
                  <div>{casaSelezionata.squere_meters}</div>
                  <div>Like: {casaSelezionata.likes}</div>
                  <div><strong>Descrizione: </strong> {casaSelezionata.descr}</div>
                  <div className={`${style.contLike}`}>
                    <AppLike flag={flag} setFlag={setFlag} id={casaSelezionata.id}></AppLike>
                    <button onClick={clickVisibile} className={`${style.contactButton}`}>
                      Contattaci
                    </button>
                  </div>
                </div>

              </div></div>
          ) : (
            <p>Caricamento della casa in corso...</p>
          )}

          {/* review section */}

          <section className={`${style.col}`}>
            {casaSelezionata && casaSelezionata.reviews.map((curRecensione, index) => (
              <div className={`${style.cardReview}`} key={index}>
                <div >{curRecensione.username}</div>
                <div>Notti trascorse:{curRecensione.length_of_stay}</div>
                <div><strong>Recensione</strong></div>
                <div>{curRecensione.review_content}</div>
              </div>
            ))}

          </section></div>

        {/* form layout */}
        <form >
          <section className={`${style.formZone}`}>
            <div className={`${style.reviewRow1}`}>
              <div className={`${style.rowForm}`}>
                <label htmlFor="name">Nome:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyUp={handleReviewKeyUp}
                  required
                />{errors.username && <p className={`${style.error}`}>{errors.username}</p>}
              </div>
              <div className={`${style.rowForm}`}>
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyUp={handleReviewKeyUp}
                  required />
                {errors.user_email && <p className={`${style.error}`}>{errors.user_email}</p>}
              </div>
              <div className={`${style.rowForm}`}>
                <label htmlFor="giorni">Giorni:</label>
                <input
                  type="number"
                  id="giorni"
                  name="giorni"
                  value={giorni}
                  onChange={(e) => setGiorni(e.target.value)}
                  onKeyUp={handleReviewKeyUp}
                  required />
                {errors.lengthOfDay && <p className={`${style.error}`}>{errors.lengthOfDay}</p>}
              </div>
            </div>
            <div className={`${style.reviewRow2}`}>
              <label htmlFor="reviewText">Recensione:</label>
              <textarea
                className={`${style.reviewArea}`}
                id="reviewText"
                value={reviewText}
                name="reviewText"
                onKeyUp={handleReviewKeyUp}
                onChange={(e) => setReviewText(e.target.value)}
                required
              />
              {errors.reviewContent && <p className={`${style.error}`}>{errors.reviewContent}</p>}
            </div>
          </section>
          <button className={`${style.inviaButton}`} onClick={handleSubmit} type="submit">Invia Recensione</button>
        </form>
      </section>
      {/* form messaggio proprietario */}
      {FormVisibile && (
        <div className={`${style.formOverlay}`}>
          <div className={`${style.formContainer}`}>
            <button onClick={clickInvisibile} className={`${style.closeButton}`}>
              X
            </button>
            <form onSubmit={handleContactSubmit}>
              <div>
                <label htmlFor="name">Nome: </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formContact.name}
                  onChange={handleChange}
                />
                {contactErrors.name && <p className={style.error}>{contactErrors.name}</p>}

                <label htmlFor="sender">Email: </label>
                <input
                  type="email"
                  id="sender"
                  name="sender"
                  value={formContact.sender}
                  onChange={handleChange}
                />
                {contactErrors.sender && <p className={style.error}>{contactErrors.sender}</p>}
              </div>
              <div className={`${style.mexCol}`}>
                <label htmlFor="message">Messaggio:</label>
                <textarea
                  className={`${style.formCol}`}
                  id="message"
                  name="message"
                  value={formContact.message}
                  onChange={handleChange}
                />
                {contactErrors.message && <p className={style.error}>{contactErrors.message}</p>}
              </div>
              <button className={`${style.inviaButton}`} type="submit">Invia</button>
            </form>
          </div>
        </div>
      )}

    </>
  )

}
export default PaginaDettaglio;

