using System.ComponentModel.DataAnnotations.Schema;

namespace ApiObras.Model
{
    [Table("tipo_de_pago")]
    public class Pago
    {
        public int Id { get; set; }
        public string Nombre_Tipo { get; set; }

    }
}
