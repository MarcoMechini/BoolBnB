import axios from "axios";

function AppLike({ id, flag, setFlag }) {

    const apiUrl = import.meta.env.VITE_API_URL

    const addLike = () => {
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