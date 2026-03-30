using System.ComponentModel.DataAnnotations.Schema;

namespace ApiObras.Model
{
    [Table("facturas")]
    public class Factura
    {
        public int Id { get; set; }
        public DateTime fecha_emision { get; set; }
        public string folio_fiscal { get; set; } = string.Empty;
        public string descripcion { get; set; } = string.Empty;
        public decimal importe { get; set; }
        public decimal iva { get; set; }
        public decimal total { get; set; }

        public int proveedor_id { get; set; }
        public int? obra_id {  get; set; }
        public int tipo_de_pago_id { get; set; }
        public int tipo_iva_id { get; set; }
        public string? ruta_pdf { get; set; }
        public string? ruta_comprobante { get; set; }

        [ForeignKey("proveedor_id")]
        public Proveedores? proveedor { get; set; }

        [ForeignKey("obra_id")]
        public Obra? obra { get; set; }

        [ForeignKey("tipo_de_pago_id")]
        public Pago? tipoPago { get; set; }

        [ForeignKey("tipo_iva_id")]
        public Iva? TipoIva { get; set; }


    }
}
