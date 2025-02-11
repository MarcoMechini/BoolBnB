import { createContext, useContext } from "react";

const GlobalContext = createContext()

function GlobalProvider({ children }) {

    const globalProviderValue = {}

    return (
        <GlobalContext.Provider value={globalProviderValue}>
            {children}
        </GlobalContext.Provider>)
}

function useGlobalContext() {
    return useContext(GlobalContext)
}

export { useGlobalContext, GlobalProvider }