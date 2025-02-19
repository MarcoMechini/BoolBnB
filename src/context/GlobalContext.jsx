import { createContext, useContext, useState } from "react";

const GlobalContext = createContext()

function GlobalProvider({ children }) {
    const [message, setMessage] = useState(null);

    const resetAlertMessage = () => {
        setTimeout(() => {
            setMessage(null);
        }, 5000);
    }

    const globalProviderValue = {
        message,
        setMessage,
        resetAlertMessage
    }

    return (
        <GlobalContext.Provider value={globalProviderValue}>
            {children}
        </GlobalContext.Provider>)
}

function useGlobalContext() {
    return useContext(GlobalContext)
}

export { useGlobalContext, GlobalProvider }