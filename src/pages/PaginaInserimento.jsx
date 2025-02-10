import axios from "axios"
import { useState } from "react"

const initialFormData = {
    title: "",
    rooms: 0,
    url_img: "",
    bedrooms: "",
    bathrooms: "",
    square_meters: "",
    address: "",
    email: "",
}

function PaginaInserimento() {

    const [formData, setFormData] = useState(initialFormData)

    const handleInputChange = (e) => {
        const newObject = { ...formData, [e.target.name]: e.target.value }
        setFormData(newObject)
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        // aggiunere chiamata api post e passagli il form data
        console.log(formData);

        axios.post('/boolbnb', formData)
            .then(resp => {
                setFormData(initialFormData)
                console.log('immobile salvato');
            }
            ).catch(err => {
                console.log(err);
            })

    }

    return (
        <>
            <h3>sono Pagina Inserimeto</h3>
            <form>
                <label htmlFor="title">Titolo</label>
                <input type="text" onChange={handleInputChange} value={formData.title} name="title" id="title" placeholder="Appartamento luminoso" />
                <label htmlFor="rooms">Stanze</label>
                <input type="text" onChange={handleInputChange} value={formData.rooms} name="rooms" id="rooms" placeholder="0" />
                <label htmlFor="url_img">Immagine</label>
                <input type="text" onChange={handleInputChange} value={formData.url_img} name="url_img" id="url_img" placeholder="immagine" />
                <label htmlFor="bedrooms">Camere</label>
                <input type="text" onChange={handleInputChange} value={formData.bedrooms} name="bedrooms" id="bedrooms" placeholder="0" />
                <label htmlFor="bathrooms">Bagni</label>
                <input type="text" onChange={handleInputChange} value={formData.bathrooms} name="bathrooms" id="bathrooms" placeholder="0" />
                <label htmlFor="square_meters">Metri quadri</label>
                <input type="text" onChange={handleInputChange} value={formData.square_meters} name="square_meters" id="square_meters" placeholder="60" />
                <label htmlFor="address">Indirizzo</label>
                <input type="text" onChange={handleInputChange} value={formData.address} name="address" id="address" placeholder="Via di qui" />
                <label htmlFor="email">Email</label>
                <input type="email" onChange={handleInputChange} value={formData.email} name="email" id="email" placeholder="example@gmail.com" />
                <button onClick={handleSubmit}>Invia</button>
            </form>
        </>
    )

}

export default PaginaInserimento