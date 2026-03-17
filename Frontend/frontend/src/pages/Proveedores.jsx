import { useState, useEffect } from "react"
import Modal from "../Components/Modal"

export default function Proveedor()
{
    const [ListaProveedor, setListaProveedor] = useState([])
    const [modoEditar, setModoEditar] = useState(false)
    const [idEditando, setIdEditando] = useState(null)
    const [isOpen, setIsOpen] = useState(false)
    const [proveedor, setProveedor] = useState({
        nombre_p: '',
        rfc: '',
    })

    const handleChange = (e) => {
    setProveedor({
        ...proveedor,
        [e.target.name]: e.target.value
    })
}
   const handleSubmit = async () => {
    if(modoEditar){
        await fetch(`http://localhost:5000/api/proveedores/${idEditando}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ ...proveedor, id: idEditando })
        })
        setListaProveedor(ListaProveedor.map(p =>
            p.id === idEditando ? { ...proveedor, id: idEditando } : p
        ))
        setModoEditar(false)
        setIdEditando(null)
    } else {
        const response = await fetch('http://localhost:5000/api/proveedores', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(proveedor)
        })
        const data = await response.json()
        setListaProveedor([...ListaProveedor, data])
    }
    setIsOpen(false)
}

    useEffect(() => {
        fetch('http://localhost:5000/api/proveedores')
        .then(res => res.json())
        .then(data => setListaProveedor(data))
        
    }, [])

    const handleDelete = async (id) => {
        if(!confirm("Esta seguro de eliminar al proveedor"))
            return

        await fetch(`http://localhost:5000/api/proveedores/${id}`,{
            method: 'DELETE'
        })
        setListaProveedor(ListaProveedor.filter(p => p.id !==id))
    }
    const handleEditar = (proveedor) => {
        setProveedor({
            nombre_p: proveedor.nombre_p,
            rfc: proveedor.rfc
        })
        setIdEditando(proveedor.id)
        setModoEditar(true)
        setIsOpen(true)
    }


    return(
        <div className="bg-gray-100 min-h-screen">
            <h1 className="text-center text-3xl font-bold py-6">Todos los proveedores</h1>

            <div className="flex items-center justify-end mr-5">
                <button
                    onClick={() => {
                        setProveedor({ nombre_p: '', rfc: '' })  // limpia el formulario
                        setModoEditar(false)
                        setIsOpen(true)
                    }}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                    Nuevo Proveedor
                </button>
            </div>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Agregar Proveedor">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="text-sm font-medium text-gray-700">Nombre Proveedor</label>
                    <input name="nombre_p" 
                     value={proveedor.nombre_p}
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

            <table className="w-full mt-6 bg-white rouded-lg shadow ">
                <thead>
                    <tr className="bg-gray-200 text-gray-700 text-left">
                        <th className="px-4 py-3">Nombre del Proveedor</th>
                        <th className="px-4 py 3">RFC</th>
                        <th className="px-4 py 3">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ListaProveedor.map((proveedor) => (
                        <tr key={proveedor.id} className="border-t border-gray-200 Hover:bg-gray-50">
                            <td className="px-4 py-3">{proveedor.nombre_p}</td>
                            <td className="px-4 py-3">{proveedor.rfc}</td>
                            <td className="px-4 py-3">
                                <button onClick={() => handleDelete(proveedor.id)} className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600">
                                    Borrar
                                </button>
                                <button 
                                    onClick={() => handleEditar(proveedor)} 
                                    className="bg-yellow-500 text-white px-3 py-1 rounded ml-3 hover:bg-yellow-600 mr-2">
                                    Editar
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}