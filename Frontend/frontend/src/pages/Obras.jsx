import { useState } from "react";
import Modal from "../Components/Modal";

export default function obras(){

    const [isOpen, setIsOpen] = useState(false)
    const [obras, setObras] = useState({
        nombre_obra: '',
        fecha_inicio: '',
        fecha_cierre: '',
    })

    const handleChange = (e) => {
        setObras({
            ...obras,
            [e.target.name]: e.target.value
        })
    }
    const handleSubmit = async () => {
    const response = await fetch('http://localhost:5000/api/obras', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(obras)
    })
    const data = await response.json()
    console.log(data)
    }


    return(
        <div className="bg-gray-100 min-h-screen">
            <h1 className="text-center text-3xl font-bold py-6">Obras Existentes </h1>


            <div className="flex item-center justify-end mr-5">
                <button 
                 onClick={() => setIsOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">Agregar Obra</button>
            </div>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Agregar Obra">
                 
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700">Nombre de la obra</label>
                            <input name="nombre_obra" 
                            value={obras.nombre_obra}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                            placeholder="Escriba un proveedor"/>
                        </div>
                        <div>
                        <label className="text-sm font-medium text-gray-700">Fecha de Inicio</label>
                        <input
                            type='Date'
                            name="fecha_inicio"
                            value={obras.fecha_inicio}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                        />
                        </div>
                        <div>
                        <label className="text-sm font-medium text-gray-700">Fecha de cierre</label>
                        <input
                            type='Date'
                            name="fecha_cierre"
                            value={obras.fecha_cierre}
                            onChange={handleChange}
                            className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
                        />
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