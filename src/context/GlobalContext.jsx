import { createContext, useContext, useState } from "react";

const GlobalContext = createContext()

function GlobalProvider({ children }) {
    const [message, setMessage] = useState(null);

    const globalProviderValue = { message, setMessage }

    return (
        <GlobalContext.Provider value={globalProviderValue}>
            {children}
        </GlobalContext.Provider>)
}

function useGlobalContext() {
    return useContext(GlobalContext)
}

export { useGlobalContext, GlobalProvider }