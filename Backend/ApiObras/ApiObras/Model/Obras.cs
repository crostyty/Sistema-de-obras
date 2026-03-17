using System.ComponentModel.DataAnnotations.Schema;

namespace ApiObras.Model
{
    [Table("obra")]
    public class Obra
    {
        public int id { get; set; }
        public string nombre_obra { get; set; }
        public DateTime fecha_inicio { get; set; }
        public DateTime fecha_cierre { get; set; }
    }
}
