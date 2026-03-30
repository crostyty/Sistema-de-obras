import { useState, useEffect } from "react";
import Modal from "../Components/Modal";

export default function obras(){

    const [isOpen, setIsOpen] = useState(false)
    const [ListaObras, setListaObras] = useState([])
    const [modoEditar, setModoEditar] = useState(false)
    const [idEditando, setIdEditando] = useState(null)
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
    if(modoEditar) {
        await fetch(`http://localhost:5000/api/obras/${idEditando}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify({...obras, id: idEditando})
        })
        setListaObras(ListaObras.map(o => 
            o.id === idEditando ? { ...obras, id: idEditando } : o
        ))
        setModoEditar(false)
        setIdEditando(null)
    } else {
        const response = await fetch('http://localhost:5000/api/obras', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(obras)
        })
        const data = await response.json()
        setListaObras([...ListaObras, data])
    }
    setIsOpen(false)
}

useEffect(() => {
    fetch('http://localhost:5000/api/obras')
    .then(res => res.json())
    .then(data => setListaObras(data))
}, [])

    const handleDelete = async (id) => {
        if(!confirm("Esta seguro de elimiar la obra?")) return

        await fetch(`http://localhost:5000/api/obras/${id}`, {
            method: 'DELETE'
        })
        setListaObras(ListaObras.filter(o => o.id !== id))
    }

    const handleEditar = (obras) => {
        setObras({
            nombre_obra: obras.nombre_obra,
            fecha_inicio: obras.fecha_inicio,
            fecha_cierre: obras.fecha_cierre
        })
        setIdEditando(obras.id)
        setModoEditar(true)
        setIsOpen(true)
    }

    return(
        <div className="bg-gray-100 min-h-screen">
            <h1 className="text-center text-3xl font-bold py-6">Obras Existentes </h1>


            <div className="flex item-center justify-end mr-5">
                <button
                    onClick={() => {
                        setObras({ nombre_obra: '', fecha_inicio: '', fecha_cierre: '' })  // limpia el formulario
                        setModoEditar(false)
                        setIsOpen(true)
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Nuevo Obra
                </button>
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

            <table className="w-full mt-6 bg-white rouded-lg shadow ">
                <thead>
                    <tr className="bg-gray-200 text-gray-700 text-left">
                        <th className="px-4 py-3">Nombre de la obra</th>
                        <th className="px-4 py-3">Fecha Inicio</th>
                        <th className="px-4 py-3">Fecha Cierre</th>
                        <th className="px-4 py-3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ListaObras.map((obras) => (
                        <tr key={obras.id} className="border-t border-gray-200 Hover:bg-gray-50">
                            <td className="px-4 py-3">{obras.nombre_obra}</td>
                            <td className="px-4 py-3">{obras.fecha_inicio}</td>
                            <td className="px-4 py-3">{obras.fecha_cierre}</td>
                            <td className="px-4 py-3">
                                <button onClick={() => handleDelete(obras.id)} >
                                    <img src="/basura.png" alt="boton-eliminar" />
                                </button>
                                <button 
                                    onClick={() => handleEditar(obras)} 
                                    className=" ml-3 ">
                                    <img className='' src="/boton-editar.svg" alt="Boton-editar" width={16}/>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}