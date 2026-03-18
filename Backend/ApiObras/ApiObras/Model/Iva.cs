using System.ComponentModel.DataAnnotations.Schema;

namespace ApiObras.Model
{
    [Table("tipo_iva")]
    public class Iva
    {
        public int Id { get; set; }
        public decimal porcentaje { get; set; }

    }
}
