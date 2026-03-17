export default function Modal({isOpen, onClose, title, children})
{
    if(!isOpen) return null

    return(
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl p-6">


                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl font-semibold text-gray-800">{title}</h2>

                    <button onClick={onClose} className="text-gray-400 hover: text-gray-600 text-2xl font-bold">
                        X
                    </button>
                </div>

                {/* Contenido */}
                <div>
                    {children}
                </div>
            </div>
        </div>
    )
}