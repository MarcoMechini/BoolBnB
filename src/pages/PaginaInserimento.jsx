import axios from "axios"
import { useEffect, useState } from "react"

const apiUrl = import.meta.env.VITE_API_URL

// const property = [
//     { type: "appartamento", value: 1 },
//     { type: "baita", value: 2 },
//     { type: "villa", value: 3 },
//     { type: "casa indipendente", value: 4 },
// ]

// id_property: 1,
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
    id_property: "",
    title: "Casa di carta",
    city: "Roma",
    descr: "Descrizione",
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

    const handleInputChange = (e) => {
        const newObject = { ...formData, [e.target.name]: e.target.value }
        setFormData(newObject)
        console.log(newObject);

    }

    const handleSubmit = (e) => {
        e.preventDefault();


        // aggiunere loading per il caricamento
        // setLoading(true)

        axios.post(`${apiUrl}/boolbnb`, formData)
            .then(resp => {
                setFormData(initialFormData)
                console.log(resp.data.status);
                // setLoading(false)
            }
            ).catch(err => {
                console.log(err);
            })
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
                    {property.map(curProp => (
                        <option key={curProp.id} value={curProp.id}>{curProp.type}</option>
                    ))}
                </select>
                <div>
                    <label htmlFor="title">Titolo</label>
                    <input type="text" onChange={handleInputChange} value={formData.title} name="title" id="title" placeholder="Casa del rinascimento" />
                </div>
                <div>
                    <label htmlFor="city">Città</label>
                    <input type="text" onChange={handleInputChange} value={formData.city} name="city" id="city" placeholder="Città" />
                </div>
                <div>
                    <label htmlFor="rooms">Stanze</label>
                    <input type="number" onChange={handleInputChange} value={formData.rooms} name="rooms" id="rooms" placeholder="0" />
                </div>
                <div>
                    <label htmlFor="url_img">Immagine</label>
                    <input type="text" onChange={handleInputChange} value={formData.url_img} name="url_img" id="url_img" placeholder="immagine" />
                </div>
                <div>
                    <label htmlFor="bedrooms">Camere</label>
                    <input type="number" onChange={handleInputChange} value={formData.bedrooms} name="bedrooms" id="bedrooms" placeholder="0" />
                </div>
                <div>
                    <label htmlFor="bathrooms">Bagni</label>
                    <input type="number" onChange={handleInputChange} value={formData.bathrooms} name="bathrooms" id="bathrooms" placeholder="0" />
                </div>
                <div>
                    <label htmlFor="square_meters">Metri quadri</label>
                    <input type="number" onChange={handleInputChange} value={formData.square_meters} name="square_meters" id="square_meters" placeholder="60" />
                </div>
                <div>
                    <label htmlFor="address">Indirizzo</label>
                    <input type="text" onChange={handleInputChange} value={formData.address} name="address" id="address" placeholder="Via di qui" />
                </div>
                <div>
                    <label htmlFor="email">Email</label>
                    <input type="email" onChange={handleInputChange} value={formData.email} name="email" id="email" placeholder="example@gmail.com" />
                </div>
                <div>
                    <label htmlFor="descr">Descrizione</label>
                    <input type="text" onChange={handleInputChange} value={formData.descr} name="descr" id="descr" placeholder="Appartamento luminoso" />
                </div>
                <button onClick={handleSubmit}>Invia</button>
            </form>
        </>
    )

}

export default PaginaInserimento