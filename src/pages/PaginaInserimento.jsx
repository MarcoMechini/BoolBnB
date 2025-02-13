import axios from "axios"
import { useEffect, useState } from "react"
import * as yup from 'yup';
const apiUrl = import.meta.env.VITE_API_URL



const schemaValidazione = yup.object().shape({
    id_property: yup.number().required("id_proprerty è obbligatorio").positive("deve essere positivo").integer("deve essere un numero intero"),
    title: yup.string().min(3,"deve essere minimo di tre lettere").max(255,"è troppo lungo").required("inserire il titolo della casa").matches(/[a-zA-Z]/, "Il titolo deve contenere almeno una lettera") ,
    city: yup.string().min(3,"deve essere minimo di tre lettere").max(100,"è troppo lungo").required("inserire la città").matches(/^[A-Za-z]+$/, "La città deve contenere solo lettere") ,
    descr: yup.string().max(500,"è troppo lungo").nullable(),
    rooms: yup.number().required("inserire numero stanze").positive("deve essere positivo").min(1,"deve avere almeno una stanza").integer("deve essere un numero intero").typeError("Devi inserire un numero"),
    bedrooms: yup.number().min(1,"deve avere almeno una stanza").required("inserire il numero camere").positive("deve essere positivo").integer("deve essere un numero intero").typeError("Devi inserire un numero"),
    bathrooms: yup.number().min(1,"deve avere almeno una stanza").required("inserire numero bagni").positive("deve essere positivo").integer("deve essere un numero intero").typeError("Devi inserire un numero"),
    square_meters: yup.number().min(9,"deve avere almeno una stanza").required("inserire metri quadrati").positive("deve essere positivo").integer("deve essere un numero intero").typeError("Devi inserire un numero"),
    address: yup.string().min(5,"deve avere almeno una stanza").max(255,"è troppo lungo").required("inserire la via "),
    email: yup.string().email("Email non valida").required("Email obbligatoria"),
});

//    id_property: 1,
// title: "",
// city: "",
// descr: "",
// rooms: 0,
// url_img: "",
// bedrooms: 0,
// bathrooms: 0,
// square_meters: 0,
// address: "",
// email: "",

const initialFormData = {
    title: "c",
    city: "Roma",
    descr: "Descrizione della casa di default",
    rooms: 2,
    url_img: "immagine.jpg",
    bedrooms: 2,
    bathrooms: 2,
    square_meters: 60,
    address: "Via di qui",
    email: "mechini48@gmail.com",

}

function PaginaInserimento() {

    useEffect(() => {
        axios.get(`${apiUrl}/boolbnb/property`).then(resp => {
            console.log(resp.data.data);
            setProperty(resp.data.data)
        })
    }, [])

    const [formData, setFormData] = useState(initialFormData)
    const [property, setProperty] = useState([])
    const[errors, setErrors] = useState({});

    const handleInputChange = (e) => {
        const newObject = { ...formData, [e.target.name]: e.target.value }
        setFormData(newObject)
        console.log(newObject);

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await schemaValidazione.validate(formData, { abortEarly: false });
            console.log("Dati validi:", formData);
            setErrors({}); // Reset degli errori se la validazione passa
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
          
        // aggiunere loading per il caricamento
        // setLoading(true)

        // axios.post(`${apiUrl}/boolbnb`, formData)
        //     .then(resp => {
        //         setFormData(initialFormData)
        //         console.log(resp.data.status);
        //         // setLoading(false)
        //     }
        //     ).catch(err => {
        //         console.log(err);
        //     })
    }

    return (
        <>
            <h3>sono Pagina Inserimeto</h3>
            <form>
                <select
                    name="id_property"
                    id="id_property"
                    onChange={handleInputChange}
                    value={formData.id_property}
                >
                    <option defaultChecked value='0'>Seleziona una tipologia</option>
                    {property.map(curProp => (
                        <option key={curProp.id} value={curProp.id}>{curProp.type}</option>
                    ))}
                </select>
                {errors.id_property && <p>{errors.id_property}</p>}
                <div>
                    <label htmlFor="title">Titolo</label>
                    <input type="text" onChange={handleInputChange} value={formData.title} name="title" id="title" placeholder="Casa del rinascimento" />
                    {errors.title && <p>{errors.title}</p>}
                </div>
                <div>
                    <label htmlFor="city">Città</label>
                    <input type="text" onChange={handleInputChange} value={formData.city} name="city" id="city" placeholder="Città" />
                    {errors.city && <p>{errors.city}</p>}
                </div>
                <div>
                    <label htmlFor="rooms">Stanze</label>
                    <input type="number" onChange={handleInputChange} value={formData.rooms} name="rooms" id="rooms" placeholder="0" />
                    {errors.rooms && <p>{errors.rooms}</p>}
                </div>
                <div>
                    <label htmlFor="url_img">Immagine</label>
                    <input type="text" onChange={handleInputChange} value={formData.url_img} name="url_img" id="url_img" placeholder="immagine" />
                </div>
                <div>
                    <label htmlFor="bedrooms">Camere</label>
                    <input type="number" onChange={handleInputChange} value={formData.bedrooms} name="bedrooms" id="bedrooms" placeholder="0" />
                    {errors.bedrooms && <p>{errors.bedrooms}</p>}
                </div>
                <div>
                    <label htmlFor="bathrooms">Bagni</label>
                    <input type="number" onChange={handleInputChange} value={formData.bathrooms} name="bathrooms" id="bathrooms" placeholder="0" />
                    {errors.bathrooms && <p>{errors.bathrooms}</p>}
                </div>
                <div>
                    <label htmlFor="square_meters">Metri quadri</label>
                    <input type="number" onChange={handleInputChange} value={formData.square_meters} name="square_meters" id="square_meters" placeholder="60" />
                    {errors.square_meters && <p>{errors.square_meters}</p>}
                </div>
                <div>
                    <label htmlFor="address">Indirizzo</label>
                    <input type="text" onChange={handleInputChange} value={formData.address} name="address" id="address" placeholder="Via di qui" />
                    {errors.address && <p>{errors.address}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={handleInputChange} value={formData.email} name="email" id="email" placeholder="example@gmail.com" />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div>
                    {/* <label htmlFor="descr">Descrizione</label> */}
                    <textarea onChange={handleInputChange} value={formData.descr} name="descr" id="descr" rows="4" placeholder="Appartamento luminoso" />
                </div>
                <button onClick={handleSubmit}>Invia</button>
            </form>
        </>
    )

}

export default PaginaInserimento