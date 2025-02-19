import style from './AppAlertMessage.module.css';

function AppAlertMessage({ message }) {
    return (
        <>
            {message && (
                <div className={`${style.message} ${message.type === 'success' ? style.success : style.error}`}>
                    {message.text}
                </div>
            )}
        </>
    )
}

export default AppAlertMessage;