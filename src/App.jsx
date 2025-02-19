import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AppLayout from './Layout/AppLayout'
import HomePage from './pages/HomePage'
import PaginaRicerca from './pages/PaginaRicerca'
import PaginaDettaglio from './pages/PaginaDettaglio'
import PaginaInserimento from './pages/PaginaInserimento'
import { GlobalProvider } from './context/GlobalContext'
import NotFound from './pages/NotFound'

function App() {

  return (
    <>
      <GlobalProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route index element={<HomePage />}></Route>
              <Route path='/Ricerca'>
                <Route index element={<PaginaRicerca />}></Route>
                <Route path=':slug' element={<PaginaDettaglio />}></Route>
              </Route>
              <Route path='/Inserimento' element={<PaginaInserimento />}></Route>
              <Route path='*' element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </GlobalProvider>
    </>
  )
}

export default App
