import { useState } from "react"
import Modal from "../Components/Modal"

export default function Proveedor()
{
    const [isOpen, setIsOpen] = useState(false)
    const [proveedor, setProveedor] = useState({
        nombre_P: '',
        rfc: '',
    })

    const handleChange = (e) => {
    setProveedor({
        ...proveedor,
        [e.target.name]: e.target.value
    })
}
   const handleSubmit = async (event) =>{
        const response = await fetch('http://localhost:5000/api/proveedores', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(proveedor)
        })
   }
    return(
        <div className="bg-gray-100 min-h-screen">
            <h1 className="text-center text-3xl font-bold py-6">Administracion de Proveedores</h1>

            <div className="flex items-center justify-end mr-5">
                <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                Nueva Proveedor
                </button>
            </div>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Agregar Factura">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Nombre Proveedor</label>
                    <input name="nombre_P" 
                     value={proveedor.nombre_P}
                     onChange={handleChange}
                     className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                     placeholder="Escriba un proveedor"/>
                </div>

                <div>
                    <label className="text-sm font-medium text-gray-700">RFC</label>
                    <input name="rfc" 
                     value={proveedor.rfc}
                     onChange={handleChange}
                     className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                     placeholder="Ej. CAS180134AP"/>
                </div>

                <div>
                    <button
                     onClick={handleSubmit}
                     className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                    >Guardar</button>
                </div>
                </div>
            </Modal>
    
        </div>
    )
}