import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useState } from 'react'
import SideBar from './Components/SideBar'
import Factura from './pages/Facturas'
import Proveedor from './pages/Proveedores'
import Obras from './pages/Obras'



function App() {
  const [sidebarAbierto, setSidebarAbierto] = useState(true)

  return (
    <BrowserRouter>
      <div className='flex'>
        <SideBar isOpen={sidebarAbierto} onToggle={() => setSidebarAbierto(!sidebarAbierto)} />
        <main className='flex-1 min-h-screen overflow-hidden'>
          <Routes>
            <Route path='/' element={<Factura/>}/>
            <Route path='/proveedores' element={<Proveedor/>}/>
            <Route path='/obras' element={<Obras/>}/>
          </Routes>
        </main>
      </div>
    </BrowserRouter>
)
}
export default App
