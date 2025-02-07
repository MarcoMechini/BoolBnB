import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes element={<AppLayout />}>
          <Route>
            <Route index element={<HomePage />}></Route>
            <Route path='/Dettaglio'>
              <Route index element={<PaginaRicerca />}></Route>
              <Route path=':id' element={<PaginaDettaglio />}></Route>
            </Route>
            <Route path='/Inserimento' element={<PaginaInserimento />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
