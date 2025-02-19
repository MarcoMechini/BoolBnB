import axios from "axios";
import { useEffect, useState } from "react";
import * as yup from 'yup';
const apiUrl = import.meta.env.VITE_API_URL;
import style from './PaginaInserimento.module.css';

const schemaValidazione = yup.object().shape({
    id_property: yup.number().typeError("Devi scegliere una tipologia di appartamento").required("Devi scegliere una tipologia di appartamento").positive("Devi scegliere una tipologia di appartamento").integer("Devi scegliere una tipologia di appartamento"),
    title: yup.string().min(3, "Il titolo descrittivo della casa deve essere almeno di 3 lettere").max(255, "È troppo lungo").matches(/[a-zA-Z]/, "Il titolo deve contenere almeno una lettera").required("Inserire il titolo della casa"),
    city: yup.string().min(3, "La Città deve essere minimo di tre lettere").max(100, "È troppo lungo").matches(/^[A-Za-z]+$/, "La città deve contenere solo lettere").required("Inserire la città"),
    descr: yup.string().nullable().max(500, "È troppo lungo"),
    rooms: yup.number().typeError("Devi inserire almeno una stanza").required("Devi inserire almeno una stanza").positive("Devi inserire almeno una stanza").integer("Devi inserire almeno una stanza").min(1, "Deve avere almeno una stanza"),
    bedrooms: yup.number().typeError("Devi inserire almeno un letto").required("Devi inserire almeno un letto").positive("Devi inserire almeno un letto").integer("Deve essere un numero intero").min(1, "Devi inserire almeno un letto")
        .test('bedrooms-greater-or-equal-rooms', 'Il numero dei letti deve essere maggiore o uguale al numero delle stanze', function (value) {
            const { rooms } = this.parent;
            return value >= rooms;
        }),
    bathrooms: yup.number().typeError("Devi inserire almeno un bagno").required("Devi inserire almeno un bagno").positive("Devi inserire almeno un bagno").integer("Deve essere un numero intero").min(1, "Deve avere almeno un bagno"),
    square_meters: yup.number().typeError("Devi inserire il numero di MQ").required("Inserire metri quadrati").positive("Devi inserire almeno 10 MQ").integer("Deve essere un numero intero").min(10, "Deve essere almeno 10 metri quadri"),
    address: yup.string().required("Inserire la via").min(5, "Deve essere minimo di 5 caratteri").max(255, "È troppo lungo"),
    email: yup.string().required("Email obbligatoria").email("Email non valida"),
});

const initialFormData = {
    id_property: 0,
    title: "",
    city: "",
    descr: "",
    rooms: "",
    url_img: null,
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
    const [file, setFile] = useState(null);

    const sendNewHouse = () => {
        const formDataToSend = new FormData();
        for (const key in formData) {
            formDataToSend.append(key, formData[key]);
        }
        if (file) {
            formDataToSend.append("url_img", file);
        }

        axios.post(`${apiUrl}/boolbnb`, formDataToSend, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(resp => {
                setFormData(initialFormData);
                setFile(null);
                console.log(resp.data.status);
            })
            .catch(err => {
                console.log(err);
            });
    };

    const handleInputChange = (e) => {
        const { name, value, files } = e.target;
        if (files) {
            setFile(files[0]);
        } else {
            const newObject = { ...formData, [name]: value };
            setFormData(newObject);
        }
        console.log(formData);
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
            <section className="container">
                <h2 className={`${style.title}`}>Inserisci dati della casa</h2>
                <form className={`${style.rowForm}`}>
                    <div className={`${style.colForm}`}>
                        <select
                            className={`${style.selectLayout}`}
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
                        {errors.id_property && <p className={`${style.error}`}>{errors.id_property}</p>}
                        <label htmlFor="title">Titolo: </label>
                        <input type="text" onChange={handleInputChange} value={formData.title} name="title" id="title" placeholder="titolo descrittivo" onKeyDown={handleKeyUp} />
                        {errors.title && <p className={`${style.error}`}>{errors.title}</p>}
                        <label htmlFor="address">Indirizzo: </label>
                        <input type="text" onChange={handleInputChange} value={formData.address} name="address" id="address" placeholder="Via" onKeyDown={handleKeyUp} />
                        {errors.address && <p className={`${style.error}`}>{errors.address}</p>}
                        <label htmlFor="city">Città: </label>
                        <input type="text" onChange={handleInputChange} value={formData.city} name="city" id="city" placeholder="Città" onKeyDown={handleKeyUp} />
                        {errors.city && <p className={`${style.error}`}>{errors.city}</p>}
                        <label htmlFor="rooms">Stanze: </label>
                        <input type="number" onChange={handleInputChange} value={formData.rooms} name="rooms" id="rooms" placeholder="0" onKeyDown={handleKeyUp} />
                        {errors.rooms && <p className={`${style.error}`}>{errors.rooms}</p>}
                        <label htmlFor="bedrooms">Letti: </label>
                        <input type="number" onChange={handleInputChange} value={formData.bedrooms} name="bedrooms" id="bedrooms" placeholder="0" onKeyDown={handleKeyUp} />
                        {errors.bedrooms && <p className={`${style.error}`}>{errors.bedrooms}</p>}
                    </div>

                    <div className={`${style.colForm}`}>
                        <label htmlFor="url_img"></label>
                        <input className={`${style.selectLayout}`} type="file" onChange={handleInputChange} name="url_img" id="url_img" placeholder="immagine" onKeyDown={handleKeyUp} />
                        <label htmlFor="bathrooms">Bagni: </label>
                        <input type="number" onChange={handleInputChange} value={formData.bathrooms} name="bathrooms" id="bathrooms" placeholder="0" onKeyDown={handleKeyUp} />
                        {errors.bathrooms && <p className={`${style.error}`}>{errors.bathrooms}</p>}
                        <label htmlFor="square_meters">MQ: </label>
                        <input type="number" onChange={handleInputChange} value={formData.square_meters} name="square_meters" id="square_meters" placeholder="0" onKeyDown={handleKeyUp} />
                        {errors.square_meters && <p className={`${style.error}`}>{errors.square_meters}</p>}
                        <label htmlFor="email">Email: </label>
                        <input type="email" onChange={handleInputChange} value={formData.email} name="email" id="email" placeholder="example@gmail.com" onKeyDown={handleKeyUp} />
                        {errors.email && <p className={`${style.error}`}>{errors.email}</p>}
                        <label htmlFor="descr">Descrizione: </label>
                        <textarea onChange={handleInputChange} value={formData.descr} name="descr" id="descr" rows="4" placeholder="Descrizione casa" onKeyUp={handleKeyUp} />
                    </div>
                </form>
                 <button className={`${style.buttonInvio}`} onClick={handleSubmit}>Invia</button>
            </section>
        </>
    );
}

export default PaginaInserimento;