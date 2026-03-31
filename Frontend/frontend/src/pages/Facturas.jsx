import { useState, useEffect } from 'react'

import Modal from '../Components/Modal'
import { data } from 'react-router-dom'



export default function Factura()
{
  const [isOpen, setIsOpen] = useState(false)
  const [ListaFacturas, setListaFacturas] = useState([])
  const [tiposPago, setTiposPago] = useState([])
  const [proveedores, setProveedores] = useState([])
  const [obrasFiltro, setObrasFiltro] = useState('')
  const [importe, setImporte] = useState(0);
  const [ivaCalculado, setIvaCalculado] = useState(0)
  const [totalCalculado, setTotalCalculado] = useState(0)
  const [porcentajeIvaSeleccionado, setPorcentajeIvaSeleccionado] = useState(0)
  const [busquedaFolio, setBusquedaFolio] = useState('')
  const [busquedaFecha, setBusquedaFecha] = useState('')
  const [pestanaActiva, setPestanaActiva] = useState(1)
  const [pdf, setPdf] = useState(null)
  const [comprobante, setComprobante] = useState(null)
  const [modalDocumento, setModalDocumento] = useState(false)
  const [facturaDocumentos, setFacturaDocumentos] = useState(null)
  const facturasFiltradas = ListaFacturas
  .filter(f => parseFloat(f.tipoIva?.porcentaje) !== 0)
  .filter(f => obrasFiltro ? f.obra_id === parseInt(obrasFiltro) : true)
  .filter(f => busquedaFolio ? f.folio_fiscal.toLowerCase().includes(busquedaFolio.toLowerCase()) : true)
  .filter(f => busquedaFecha? f.fecha_emision.split('T')[0] === busquedaFecha : true)
  const totalAcum = ListaFacturas
  .filter(f => Number(f.tipoIva?.porcentaje) !== 0)
 .reduce((acc, f) => acc + parseFloat(f.total || 0), 0)
  const totalTasa0 = ListaFacturas
  .filter(f => f.tipoIva?.porcentaje === 0)
  .reduce((acc, f) => acc + f.total, 0)
  console.log('facturasFiltradas:', facturasFiltradas.map(f => f.folio_fiscal))
  const [gastos, setGastos] = useState([])
  const [gastosIva, setGastosIva] = useState([])
  const [TipoIva, setTipoIva] = useState([])
  const [Obra, setObra] = useState([])
  const [modoEditar, setModoEditar] = useState(false)
  const [idEditando, setIdEditando] = useState(null)
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

    fetch('http://localhost:5000/api/facturas')
    .then(res => res.json())
    .then(data => { console.log(data) 
      setListaFacturas(data)})

    fetch('http://localhost:5000/api/obras/gastos')
    .then(res => res.json())
    .then(data => setGastos(data))

    fetch('http://localhost:5000/api/iva/montoIva')
    .then(res => res.json())
    .then(data => setGastosIva(data))
  }, [])

  useEffect(() => {
  const importeNum = parseFloat(importe) || 0
  if (importeNum && porcentajeIvaSeleccionado !== undefined) {
    const iva = importeNum * (porcentajeIvaSeleccionado / 100)
    const total = importeNum + iva
    setIvaCalculado(iva)
    setTotalCalculado(total)
    setFactura(prev => ({ ...prev, importe: importeNum, iva, total }))
  }
}, [importe, porcentajeIvaSeleccionado])


const cargarFacturas = () => {
  fetch('http://localhost:5000/api/facturas')
    .then(res => res.json())
    .then(data => setListaFacturas(data))
}

  const handleChange = (e) => {
    setFactura({ ...factura, [e.target.name]: e.target.value })
  }

  const handleSubmit = async () => {
  if(modoEditar)
  {
    const facturaEditada = {
      id: idEditando,
      folio_fiscal: factura.folio_fiscal,
      fecha_emision: factura.fecha_emision,
      descripcion: factura.descripcion,
      importe: parseFloat(factura.importe),
      iva: parseFloat(factura.iva),
      total: parseFloat(factura.total),
      proveedor_id: factura.proveedor_id,
      obra_id: factura.obra_id === '' ? null : factura.obra_id,
      tipo_de_pago_id: factura.tipo_de_pago_id,
      tipo_iva_id: factura.tipo_iva_id
    }

    const response = await fetch(`http://localhost:5000/api/facturas/${idEditando}`, {
      method: 'PUT',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(facturaEditada)
    })

    if(response.ok){
      
      cargarFacturas()
      setModoEditar(false)
      setIdEditando(null)
      setIsOpen(false)
    } else {
      const errorText = await response.text()
      console.log('Error:', errorText)
    }
  }
  
     else{ // Crear un objeto limpio solo con los campos necesarios
      const facturaLimpia = {
  folio_fiscal: factura.folio_fiscal,
  fecha_emision: factura.fecha_emision,
  descripcion: factura.descripcion,
  importe: parseFloat(factura.importe),
  iva: parseFloat(factura.iva),
  total: parseFloat(factura.total),
  proveedor_id: parseInt(factura.proveedor_id),
  obra_id: factura.obra_id === '' ? null : parseInt(factura.obra_id),
  tipo_de_pago_id: parseInt(factura.tipo_de_pago_id),
  tipo_iva_id: parseInt(factura.tipo_iva_id)
}
try {
  const response = await fetch('http://localhost:5000/api/facturas', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(facturaLimpia)
  })

  if (response.ok) {
    const data = await response.json()
    
    // Subir archivos si existen
    if (pdf || comprobante) {
      const formData = new FormData()
      if (pdf) formData.append('pdf', pdf)
      if (comprobante) formData.append('comprobante', comprobante)
      
      const uploadResponse = await fetch(`http://localhost:5000/api/facturas/upload/${data.id}`, {
        method: 'POST',
        body: formData
      })
      
      const uploadText = await uploadResponse.text()
      console.log('Upload response:', uploadText)
    }

    cargarFacturas()
    setIsOpen(false)
  } else {
    const errorText = await response.text()
    console.log('Error del backend:', errorText)
  }
} catch (error) {
  console.log('Error:', error)
}

     }  
}

const handleDelete = async (id) => {
    if (!window.confirm('¿Estás seguro de eliminar esta factura?')) return
    
    const response = await fetch(`http://localhost:5000/api/facturas/${id}`, {
      method: 'DELETE'
    })
    if(response.ok){
      cargarFacturas();
    }
}

const handleEditar = (f) => {
  
  setFactura({
    id: f.id,
    folio_fiscal: f.folio_fiscal,
    fecha_emision: f.fecha_emision?.split('T')[0],
    descripcion: f.descripcion,
    importe: f.importe,
    iva: f.iva,
    total: f.total,
    proveedor_id: f.proveedor_id,
    obra_id: f.obra_id,
    tipo_de_pago_id: f.tipo_de_pago_id,
    tipo_iva_id: f.tipo_iva_id
  })

  setIdEditando(f.id)
  setModoEditar(true)
  setIsOpen(true)
  setImporte(f.importe)
  setPorcentajeIvaSeleccionado(f.tipoIva?.porcentaje || 0)
}

   return (
    <div className=" min-h-screen px-6 py-6 overflow-hidden">
      
      <h1 className="text-center text-3xl font-bold py-6">Todas las Facturas</h1>


      <div className="flex items-center gap-4 mt-4 mb-2">
        <label className="text-sm font-medium text-gray-700">Filtrar obras</label>
        <select 
         value={obrasFiltro}
         onChange={(e) => setObrasFiltro(e.target.value)} 
         className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Todas las obras</option>
          {Obra.map((o) => (
            <option key={o.id} value={o.id}>{o.nombre_obra}</option>
          ))}
        </select>

        <label className="text-sm font-medium text-gray-700">Filtrar Fecha:</label>
          <input
            type="date"
            value={busquedaFecha}
            onChange={(e) => setBusquedaFecha(e.target.value)}
            placeholder="Ej. ABC-001"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <label className="text-sm font-medium text-gray-700">Buscar folio:</label>
          <input
            type="text"
            value={busquedaFolio}
            onChange={(e) => setBusquedaFolio(e.target.value)}
            placeholder="Ej. C9420B71"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        
      </div>

      
  
      <div className="flex items-center justify-end gap-4 mt-4 mb-2">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mb-3"
        >
          Nueva Factura
        </button>
      </div>
  
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Agregar Factura">
        <div className='flex border-b mb-4'>
          <button onClick={() => setPestanaActiva(1)} className={`px-4 py-2 text-sm font-medium ${
            pestanaActiva === 1
            ? 'border-b-2 border-blue-600 text-blue-600'
            : 'text-gray-500 hover:text-gray-700'
            }`}>
          Datos Factura
          </button>

          <button
          onClick={() => setPestanaActiva(2)}
          className={`px-4 py-2 text-sm font-medium ${
            pestanaActiva === 2
              ? 'border-b-2 border-blue-600 text-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
        Documentos
      </button>
        </div>
        {/* Pestaña 1 */}
{pestanaActiva === 1 && (
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
              value={importe}
              onChange={(e) => setImporte(e.target.value)}
              onBlur={(e) => setImporte(parseFloat(e.target.value) || 0)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              placeholder="2500.55"
            />
          </div>
          
          <div>
            <label className="text-sm font-medium text-gray-700">Iva</label>
            <input
              name="iva"
              value={ivaCalculado.toFixed(2)}
              readOnly
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
                  setPorcentajeIvaSeleccionado(select2.porcentaje)
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
              readOnly
              value={totalCalculado.toFixed(2)}
              className="w-full border border-gray-300 rounded-lg px-3 py-2 mt-1"
              placeholder="2750.55"
            />
          </div>
        </div>
)}

{/* Pestaña 2 */}
{pestanaActiva === 2 && (
  <div className="flex flex-col gap-4">
    <div>
      <label className='text-sm font-medium text-gray-700'>Pdf de la factura</label>
      <input type="file"
      accept='.pdf' 
      onChange={(e) => setPdf(e.target.files[0])}
      className='w-full border border-gray-300 rounded-lg px-3 py-2 mt-1'/>
    </div>

    <div>
      <label className='text-sm font-medium text-gray-700'>Subir Comprobante</label>
      <input type="file"
      accept="image/*,.pdf" 
      onChange={(e) => setComprobante(e.target.files[0])}
      className='w-full border border-gray-300 rounded-lg px-3 py-2 mt-1'/>
    </div>
  </div>
)}
        <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 text-white py-2 rounded-lg mt-3 hover:bg-blue-700"
          >
            Guardar
          </button>
      </Modal>


      <div className="overflow-x-auto overflow-y-auto rounded-lg shadow min-h-3">
  <table className="w-full max-h-100 overflow-y-auto bg-white min-w-max">
    <thead className="bg-gray-200">
      <tr>
        <th className="p-3 text-left">Proveedor</th>
        <th className="p-3 text-left">Fecha Emisión</th>
        <th className="p-3 text-left">Folio Fiscal</th>
        <th className="p-3 text-left">Obra</th>
        <th className="p-3 text-left">Metodo de pago</th>
        <th className="p-3 text-left">Descripcion</th>
        <th className="p-3 text-left">Importe</th>
        <th className="p-3 text-left">IVA</th>
        <th className="p-3 text-left">Total</th>
        <th className="p-3 text-left">Acciones</th>
      </tr>
    </thead>
    <tbody>
  {facturasFiltradas.map((f) => (
    <tr key={f.id} className="hover:bg-gray-50">
      <td className="p-3">{f.proveedor?.nombre_p}</td>
      <td className="p-3">{f.fecha_emision?.split('T')[0]}</td>
      <td className="p-3">{f.folio_fiscal}</td>
      <td className="p-3">{f.obra?.nombre_obra ?? 'Sin obra'}</td>
      <td className="p-3">{f.tipoPago?.nombre_Tipo}</td>
      <td className="p-3">{f.descripcion}</td>
      <td className="p-3">${f.importe.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
      <td className="p-3">${f.iva.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
      <td className="p-3">${f.total.toLocaleString('es-MX', { minimumFractionDigits: 2 })}</td>
      <td className="p-3">
      <button
        onClick={() => handleDelete(f.id)}
      >
        <img src="/basura.png" alt="boton-eliminar" />
    </button>
    <button
      onClick={() =>  handleEditar(f)
      }
      className='ml-3'
    >
      <img className='' src="/boton-editar.svg" alt="Boton-editar" width={16}/>
    </button>
    {(f.ruta_pdf || f.ruta_comprobante) ? (
      <button 
       className="text-blue-500 hover:text-blue-700"
       title="Ver documentos"
       onClick={() => {
        setFacturaDocumentos(f)
        setModalDocumento(true)
      }}>
        <img className='ml-3' src="/ojo.png" alt="boton ver"/>
      </button>
    ): (
    <span className="text-gray-400 text-xs">Sin documentos</span>
  )}
    </td>
    </tr>
  ))}
</tbody>
  </table>
</div>

  <div className='flex justify-start mt-4 mb-2 mr-2'>
  
    <div className='bg-white rounded-lg shadow px-6 py-4'>
      {gastos.map((g, index) => (
        <div key={index} className='mb-2'>
          <h3 className='text-sm '><strong>{g.obra}:</strong></h3>
          <p className='text-2xl font-bold text-blue-600'>
        ${g.total.toLocaleString('es-MX', {mininumFractionDigits: 2})} 
      </p>
        </div>
      ))}
    </div>
    <div className='bg-white rounded-lg shadow px-6 py-4'>
  {gastosIva.map((i, index) => (
    <div key={index} className='mb-2'>
      <h3 className='text-sm '><strong>{i.iva}%:</strong></h3>
      <p className='text-2xl font-bold text-blue-600'>
        ${i.totalIva?.toLocaleString('es-MX', { mininumFractionDigits: 2 })}
      </p>
    </div>
  ))}
  <p className="text-sm"><strong>Total tasa 0%</strong></p>
      <p className='text-2xl font-bold text-blue-600'>
        ${totalTasa0.toLocaleString('es-MX', { mininumFractionDigits: 2 })}
      </p>
</div>
  <div className='bg-white rounded-lg shadow px-6 py-4'>
      <h3 className='text-sm '><strong>Total del mes:</strong></h3>
      <p className='text-2xl font-bold text-blue-600'>
        ${totalAcum.toLocaleString('es-MX', {mininumFractionDigits: 2})} 
      </p>
    </div>
  </div>

  <Modal isOpen={modalDocumento} onClose={() => setModalDocumento(false)} title="Documentos de la factura">
  <div className="flex flex-col gap-4 max-h-130 overflow-y-auto">
    
    {facturaDocumentos?.ruta_pdf && (
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Factura PDF</h3>
        <iframe
          src={`http://localhost:5000/${facturaDocumentos.ruta_pdf}`}
          className="w-full h-200 border rounded"
          title="PDF"
        />
      </div>
    )}

    {facturaDocumentos?.ruta_comprobante && (
      <div>
        <h3 className="text-sm font-medium text-gray-700 mb-2">Comprobante de pago</h3>
        {facturaDocumentos.ruta_comprobante.endsWith('.pdf') ? (
          <iframe
            src={`http://localhost:5000/${facturaDocumentos.ruta_comprobante}`}
            className="w-full h-150 border rounded"
            title="Comprobante PDF"
          />
        ) : (
          <img
            src={`http://localhost:5000/${facturaDocumentos.ruta_comprobante}`}
            className="w-150 object-contain border rounded"
            alt="Comprobante"
          />
        )}
      </div>
    )}

  </div>
</Modal>
    </div>
  )
}