import { Link, useLocation } from 'react-router-dom'

const menu = [
    { nombre: 'Agregar Facturas', ruta: '/' },
    { nombre: 'Agregar Proveedores', ruta: '/proveedores' },
]

export default function SideBar({ isOpen, onToggle })
{
    const location = useLocation()

    return(
        <div className={`bg-gray-900 min-h-screen transition-all duration-300 ${isOpen ? 'w-64' : 'w-16'}`}>
      
      {/* Botón toggle */}
      <button
        onClick={onToggle}
        className="text-white w-full flex items-center justify-center py-4 hover:bg-gray-800"
      >
        {isOpen ? '←' : '→'}
      </button>

      {/* Menu */}
      {isOpen && (
        <>
          <h2 className="text-white text-xl font-bold px-6 pb-6">
            Sistema de Obras
          </h2>
          <nav className="flex flex-col gap-2 px-3">
            {menu.map((item) => (
              <Link
                key={item.ruta}
                to={item.ruta}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                  ${location.pathname === item.ruta
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                  }`}
              >
                {item.nombre}
              </Link>
            ))}
          </nav>
        </>
      )}

    </div>
    )
}