import { useNavigate, useParams } from "react-router-dom";

function PaginaDettaglio() {

    const navigate = useNavigate()
    const { id } = useParams()



    return (
        <>
        <button onClick={() => navigate(-1)}>Indietro</button>
            <h3>sono pagina dettaglio {id}</h3>
        </>
    )

}

export default PaginaDettaglio;

