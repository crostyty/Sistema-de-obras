import { useState } from 'react'

import Modal from '../Components/Modal'



export default function Factura()
{
    

  const [isOpen, setIsOpen] = useState(false)
  const [factura, setFactura] = useState({
    folio_fiscal: '',
    fecha_emision: '',
    fecha_pago: '',
    descripcion: '',
    importe: '',
    iva: '',
    total: ''
  })
  const [proveedores, setProveedores] = useState([
  { id: 1, nombre: 'Cemex' },
  { id: 2, nombre: 'Grupo Herdez' },
  { id: 3, nombre: 'Aceros del Norte' },
])

const [TipoPago, setTipoPago] = useState([
  {id: 1, tipo: 'Efectivo'},
  {id: 2, tipo: 'Transferencia'},
  {id: 3, tipo: 'Tarjeta'},
  {id: 4, tipo: 'Por definir'},
])
const [Obra, setObra] = useState([
  {id: 1, nomObra: 'mtto'},
  {id: 1, nomObra: 'Lagartero'},
  {id: 1, nomObra: 'Hacienda'},
])

const [TipoIva, setTipoIva] = useState([
  {id: 1, tipoIva: '16%'},
  {id: 2, tipoIva: '8%'},
])

  const handleChange = (e) => {
    setFactura({ ...factura, [e.target.name]: e.target.value })
  }

  const handleSubmit = () => {
    console.log(factura)
    setIsOpen(false)
  }

   return (
    <div className="bg-gray-100 min-h-screen">
      
      <h1 className="text-center text-3xl font-bold py-6">
        Administración de Facturas
      </h1>
  
      <div className="flex items-center justify-end mr-5">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
        >
          Nueva Factura
        </button>
      </div>
  
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Agregar Factura">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-sm font-medium text-gray-700">Proveedor</label>
            <input
              list="lista-proveedores"
              name="proveedor"
              value={factura.proveedor}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Selecciona el proveedor"
            />
            <datalist id="lista-proveedores">
              {proveedores.map((p) => (
                <option key={p.id} value={p.nombre} />
              ))}
            </datalist>
          </div>
  
          <div>
            <label className="text-sm font-medium text-gray-700">Fecha de Emision</label>
            <input
              type='Date'
              name="fecha_e"
              value={factura.fecha_emision}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              placeholder="Ej. ABC-001"
            />
          </div>
  
          <div>
            <label className="text-sm font-medium text-gray-700">Folio Fiscal</label>
            <input
              name="fecha_e"
              value={factura.fecha_emision}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              placeholder="Los primeros 5 caracteres"
            />
          </div>
  
          <div>
            <label className="text-sm font-medium text-gray-700">Tipo de pago</label>
            <input
              list="lista_pagos"
              name="Pagos"
              value={factura.TipoPago}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Selecciona el proveedor"
            />
            <datalist id="lista_pagos">
              {TipoPago.map((p) => (
                <option key={p.id} value={p.tipo} />
              ))}
            </datalist>
          </div>
  
          <div>
            <label className='text-sm font-medium text-gray-700'>Obra</label>
            <input list='Lista_obra'
              name='Obra'
              value={factura.Obra} 
              onChange={handleChange}
              className='w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Seleccione la obra'/>
              <datalist id='Lista_obra'>
                {Obra.map((o) => (
                  <option key = {o.id} value={o.nomObra}/>
                ))}
              </datalist>
          </div>
  
          <div>
            <label className="text-sm font-medium text-gray-700">Descripcion</label>
             <textarea
              name="descripcion"
              value={factura.descripcion}
              onChange={handleChange}
              rows={4}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              placeholder="Descripción de la factura"
            />
          </div>
  
          <div>
            <label className="text-sm font-medium text-gray-700">Importe</label>
            <input
              name="importe"
              value={factura.importe}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              placeholder="2500.55"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Iva</label>
            <input
              name="iva"
              value={factura.iva}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              placeholder="250.55"
            />
          </div>
  
          <div>
            <label className="text-sm font-medium text-gray-700">Tipo de Iva</label>
            <input
              list="lista_Iva"
              name="Iva"
              value={factura.TipoIva}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Selecciona el tipo de iva"
            />
            <datalist id="lista_Iva">
              {TipoIva.map((p) => (
                <option key={p.id} value={p.tipoIva} />
              ))}
            </datalist>
          </div>
  
          <div>
            <label className="text-sm font-medium text-gray-700">Total</label>
            <input
              name="total"
              value={factura.total}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              placeholder="2750.55"
            />
          </div>
          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
          >
            Guardar
          </button>
        </div>
      </Modal>
  
    </div>
  )
}