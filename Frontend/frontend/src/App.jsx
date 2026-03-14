import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import SideBar from './Components/SideBar'
import Factura from './pages/Facturas'
import Proveedor from './pages/Proveedores'



function App() {
  const [sidebarAbierto, setSidebarAbierto] = useState(true)

  return (
    <BrowserRouter>
      <div className='flex'>
        <SideBar isOpen={sidebarAbierto} onToggle={() => setSidebarAbierto(!sidebarAbierto)} />
        <main className='flex-1 bg-gray-100 min-h-screen p-8'>
          <Routes>
            <Route path='/' element={<Factura/>}/>
            <Route path='/proveedores' element={<Proveedor/>}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
)
}
export default App
