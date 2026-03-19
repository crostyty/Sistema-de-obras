import { useState, useEffect } from 'react'

import Modal from '../Components/Modal'



export default function Factura()
{
  const [isOpen, setIsOpen] = useState(false)
  const [ListaFacturas, setListaFacturas] = useState([])
  const [tiposPago, setTiposPago] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [TipoIva, setTipoIva] = useState([])
  const [Obra, setObra] = useState([])
  const [factura, setFactura] = useState({
    folio_fiscal: '',
    fecha_emision: '',
    fecha_pago: '',
    descripcion: '',
    importe: '',
    iva: '',
    total: '',
    proveedor_id: '',
    obra_id: '',
    tipo_de_pago_id: '',
    tipo_iva_id: ''
  })

  useEffect(() => {
    fetch('http://localhost:5000/api/pago')
    .then(res => res.json())
    .then(data => setTiposPago(data))

    fetch('http://localhost:5000/api/proveedores')
    .then(res => res.json())
    .then(data => setProveedores(data))

    fetch('http://localhost:5000/api/iva')
    .then(res => res.json())
    .then(data => setTipoIva(data))

    fetch('http://localhost:5000/api/obras')
    .then(res => res.json())
    .then(data => setObra(data))
  }, [])





  const handleChange = (e) => {
    setFactura({ ...factura, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:5000/api/facturas', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(factura)
        })
        const data = await response.json()
        setListaFacturas([...ListaFacturas, data])
    setIsOpen(false)
  }
   return (
    <div className="bg-gray-100 min-h-screen">
      
      <h1 className="text-center text-3xl font-bold py-6">Todas las Facturas</h1>
  
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
              onChange={(e) => {
                const select1 = proveedores.find(pro => pro.nombre_p === e.target.value)
                if(select1) setFactura({...factura, proveedor_id: select1.id })
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Selecciona el proveedor"
            />
            <datalist id="lista-proveedores">
              {proveedores.map((p) => (
                <option key={p.id} value={p.nombre_p} />
              ))}
            </datalist>
          </div>
  
          <div>
            <label className="text-sm font-medium text-gray-700">Fecha de Emision</label>
            <input
              type='Date'
              name="fecha_emision"
              value={factura.fecha_emision}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              placeholder="Ej. ABC-001"
            />
          </div>
  
          <div>
            <label className="text-sm font-medium text-gray-700">Folio Fiscal</label>
            <input
              name="folio_fiscal"
              value={factura.folio_fiscal}
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
              onChange={(e) => {
                const select = tiposPago.find(pago => pago.nombre_Tipo === e.target.value)
                if(select) setFactura({...factura, tipo_de_pago_id: select.id})
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Selecciona el metodo de pago"
            />
            <datalist id="lista_pagos">
              {tiposPago.map((p) => (
                <option key={p.id} value={p.nombre_Tipo} />
              ))}
            </datalist>
          </div>
  
          <div>
            <label className='text-sm font-medium text-gray-700'>Obra</label>
            <input list='Lista_obra'
              name='Obra'

              onChange={(e) => {
                const select3 = Obra.find(obra => obra.nombre_obra === e.target.value)
                if(select3) setFactura({...factura, obra_id: select3.id})
              }}
              className='w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500'
              placeholder='Seleccione la obra'/>
              <datalist id='Lista_obra'>
                {Obra.map((o) => (
                  <option key = {o.id} value={o.nombre_obra}/>
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
              onChange={(e) => {
                const select2 = TipoIva.find(t => t.porcentaje === parseFloat(e.target.value))
                if(select2) setFactura({...factura, tipo_iva_id: select2.id})
              }}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Selecciona el tipo de iva"
            />
            <datalist id="lista_Iva">
              {TipoIva.map((p) => (
                <option key={p.id} value={p.porcentaje} />
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


      <div className="mt-6 mx-5">
  <table className="w-full bg-white rounded-lg shadow">
    <thead className="bg-gray-200">
      <tr>
        <th className="p-3 text-left">Folio Fiscal</th>
        <th className="p-3 text-left">Proveedor</th>
        <th className="p-3 text-left">Fecha Emisión</th>
        <th className="p-3 text-left">Importe</th>
        <th className="p-3 text-left">IVA</th>
        <th className="p-3 text-left">Total</th>
      </tr>
    </thead>
    <tbody>
  {facturas.map((f) => (
    <tr key={f.id} className="border-t hover:bg-gray-50">
      <td className="p-3">{f.proveedor?.nombre_p}</td>
      <td className="p-3">{f.folio_fiscal}</td>
      <td className="p-3">{f.obra?.nombre_obra ?? 'Sin obra'}</td>
      <td className="p-3">{f.fecha_emision?.split('T')[0]}</td>
      <td className="p-3">${f.importe}</td>
      <td className="p-3">${f.iva}</td>
      <td className="p-3">${f.total}</td>
    </tr>
  ))}
</tbody>
  </table>
</div>
  
    </div>
  )
}