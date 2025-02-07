import { useParams } from "react-router-dom";

function PaginaDettaglio() {
    const { id } = useParams()
    return (
        <>
            <h3>sono pagina dettaglio {id}</h3>
        </>
    )

}

export default PaginaDettaglio;

