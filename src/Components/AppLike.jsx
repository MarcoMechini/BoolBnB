import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";

function AppLike({ id, flag, setFlag }) {

    const apiUrl = import.meta.env.VITE_API_URL

    const addLike = () => {

        //chiamata api dove viene modificato il valore di setFlag che innesca la chiamata api di tutti i post
        //i props da passare sono l'id della card ed uno use state numerico da incrementare e che al cambio rifaccia la chiamata api
        axios.patch(`${apiUrl}/boolbnb/${id}`).then(resp => {
            setFlag(flag + 1)
            console.log('like aggiunto')
        }).catch(err => {
            console.log(err);
        })
    }

    return (
        <>
            <FontAwesomeIcon onClick={addLike} icon={faHeart} size="2x" color="red" />
        </>
    )
}

export default AppLike;