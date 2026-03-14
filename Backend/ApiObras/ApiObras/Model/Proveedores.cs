using System.ComponentModel.DataAnnotations.Schema;

namespace ApiObras.Model
{
    [Table("proveedor")]
    public class Proveedores
    {
        public int Id { get; set; }
        public string Nombre_p { get; set; } = string.Empty;
        public string RFC { get; set; } = string.Empty;
    }
}
