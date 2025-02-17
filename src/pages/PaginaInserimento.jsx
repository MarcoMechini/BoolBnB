import axios from "axios";
import { useEffect, useState } from "react";
import * as yup from 'yup';
const apiUrl = import.meta.env.VITE_API_URL;

const schemaValidazione = yup.object().shape({
    id_property: yup.number().typeError("Devi inserire un numero").required("id_property è obbligatorio").positive("Deve essere positivo").integer("Deve essere un numero intero"),
    title: yup.string().min(3, "Deve essere minimo di tre lettere").max(255, "È troppo lungo").matches(/[a-zA-Z]/, "Il titolo deve contenere almeno una lettera").required("Inserire il titolo della casa"),
    city: yup.string().min(3, "Deve essere minimo di tre lettere").max(100, "È troppo lungo").matches(/^[A-Za-z]+$/, "La città deve contenere solo lettere").required("Inserire la città"),
    descr: yup.string().nullable().max(500, "È troppo lungo"),
    rooms: yup.number().typeError("Devi inserire un numero").required("Inserire numero stanze").positive("Deve essere positivo").integer("Deve essere un numero intero").min(1, "Deve avere almeno una stanza"),
    bedrooms: yup.number().typeError("Devi inserire un numero").required("Inserire il numero camere").positive("Deve essere positivo").integer("Deve essere un numero intero").min(1, "Deve avere almeno una stanza"),
    bathrooms: yup.number().typeError("Devi inserire un numero").required("Inserire numero bagni").positive("Deve essere positivo").integer("Deve essere un numero intero").min(1, "Deve avere almeno un bagno"),
    square_meters: yup.number().typeError("Devi inserire un numero").required("Inserire metri quadrati").positive("Deve essere positivo").integer("Deve essere un numero intero").min(10, "Deve essere almeno 10 metri quadri"),
    address: yup.string().required("Inserire la via").min(5, "Deve essere minimo di 5 caratteri").max(255, "È troppo lungo"),
    email: yup.string().required("Email obbligatoria").email("Email non valida"),
});

const initialFormData = {
    id_property: 0,
    title: "",
    city: "",
    descr: "",
    rooms: "",
    url_img: "",
    bedrooms: "",
    bathrooms: "",
    square_meters: "",
    address: "",
    email: "",
};

function PaginaInserimento() {
    useEffect(() => {
        axios.get(`${apiUrl}/boolbnb/property`).then(resp => {
            console.log(resp.data.data);
            setProperty(resp.data.data);
        });
    }, []);

    const [formData, setFormData] = useState(initialFormData);
    const [property, setProperty] = useState([]);
    const [errors, setErrors] = useState({});

    const sendNewHouse = () => {
        // setLoading(true);
        axios.post(`${apiUrl}/boolbnb`, formData)
            .then(resp => {
                setFormData(initialFormData);
                console.log(resp.data.status);
                // setLoading(false);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleInputChange = (e) => {
        const newObject = { ...formData, [e.target.name]: e.target.value };
        setFormData(newObject);
        console.log(newObject);
    };

    const handleKeyUp = (e) => {
        if (e.key === 'Enter') {
            handleSubmit(e);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await schemaValidazione.validate(formData, { abortEarly: false });
            console.log("Dati validi:", formData);
            setErrors({}); // Reset degli errori se la validazione passa
            sendNewHouse();
        } catch (err) {
            const errorMessages = {};

            if (err.inner) {
                err.inner.forEach((error) => {
                    errorMessages[error.path] = error.message;
                    console.log(errorMessages);
                });
            } else {
                errorMessages[err.path] = err.message;
            }

            setErrors(errorMessages);
        }
    };

    return (
        <>
            <h3>sono Pagina Inserimeto</h3>
            <form>
                <select
                    name="id_property"
                    id="id_property"
                    onChange={handleInputChange}
                    value={formData.id_property}
                    onKeyDown={handleKeyUp}
                >
                    <option defaultChecked value='0'>Seleziona una tipologia</option>
                    {property.map(curProp => (
                        <option key={curProp.id} value={curProp.id}>{curProp.type}</option>
                    ))}
                </select>
                {errors.id_property && <p>{errors.id_property}</p>}
                <div>
                    <label htmlFor="title">Titolo</label>
                    <input type="text" onChange={handleInputChange} value={formData.title} name="title" id="title" placeholder="Casa del rinascimento" onKeyDown={handleKeyUp} />
                    {errors.title && <p>{errors.title}</p>}
                </div>
                <div>
                    <label htmlFor="city">Città</label>
                    <input type="text" onChange={handleInputChange} value={formData.city} name="city" id="city" placeholder="Città" onKeyDown={handleKeyUp} />
                    {errors.city && <p>{errors.city}</p>}
                </div>
                <div>
                    <label htmlFor="rooms">Stanze</label>
                    <input type="number" onChange={handleInputChange} value={formData.rooms} name="rooms" id="rooms" placeholder="0" onKeyDown={handleKeyUp} />
                    {errors.rooms && <p>{errors.rooms}</p>}
                </div>
                <div>
                    <label htmlFor="url_img">Immagine</label>
                    <input type="text" onChange={handleInputChange} value={formData.url_img} name="url_img" id="url_img" placeholder="immagine" onKeyDown={handleKeyUp} />
                </div>
                <div>
                    <label htmlFor="bedrooms">Camere</label>
                    <input type="number" onChange={handleInputChange} value={formData.bedrooms} name="bedrooms" id="bedrooms" placeholder="0" onKeyDown={handleKeyUp} />
                    {errors.bedrooms && <p>{errors.bedrooms}</p>}
                </div>
                <div>
                    <label htmlFor="bathrooms">Bagni</label>
                    <input type="number" onChange={handleInputChange} value={formData.bathrooms} name="bathrooms" id="bathrooms" placeholder="0" onKeyDown={handleKeyUp} />
                    {errors.bathrooms && <p>{errors.bathrooms}</p>}
                </div>
                <div>
                    <label htmlFor="square_meters">Metri quadri</label>
                    <input type="number" onChange={handleInputChange} value={formData.square_meters} name="square_meters" id="square_meters" placeholder="60" onKeyDown={handleKeyUp} />
                    {errors.square_meters && <p>{errors.square_meters}</p>}
                </div>
                <div>
                    <label htmlFor="address">Indirizzo</label>
                    <input type="text" onChange={handleInputChange} value={formData.address} name="address" id="address" placeholder="Via di qui" onKeyDown={handleKeyUp} />
                    {errors.address && <p>{errors.address}</p>}
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={handleInputChange} value={formData.email} name="email" id="email" placeholder="example@gmail.com" onKeyDown={handleKeyUp} />
                    {errors.email && <p>{errors.email}</p>}
                </div>
                <div>
                    <textarea onChange={handleInputChange} value={formData.descr} name="descr" id="descr" rows="4" placeholder="Appartamento luminoso" onKeyUp={handleKeyUp} />
                </div>
                <button onClick={handleSubmit}>Invia</button>
            </form>
        </>
    );
}

export default PaginaInserimento;