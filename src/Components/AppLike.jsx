import axios from "axios";

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
            <h3 onClick={addLike}>sono Like</h3>
        </>
    )
}

export default AppLike;