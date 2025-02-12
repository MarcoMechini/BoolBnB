function AppLike({ id }) {

    const apiUrl = import.meta.env.VITE_API_URL

    const addLike = (id) => {
        axios.patch(`${apiUrl}/boolbnb/${id}`).then(resp => {
            console.log(resp);

            console.log('like aggiunto')
        }).catch(err => {
            console.log(err);
        })
    }
    return (
        <>
            <h3 id={id} onClick={addLike}>sono Like</h3>
        </>
    )
}

export default AppLike;