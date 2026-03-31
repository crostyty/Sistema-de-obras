using Microsoft.AspNetCore.Http.HttpResults;

using ApiObras.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiObras.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class FacturasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public FacturasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Factura>>> GetFactura()
        {
            return await _context.Facturas
                .Include(f => f.proveedor)
                .Include(f => f.obra)
                .Include(f => f.tipoPago)
                .Include(f => f.TipoIva)
                .OrderBy(f => f.fecha_emision)
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Factura>> PostFacturas(Factura facturas)
        {
            var tipoIva = await _context.Ivas
                .FirstOrDefaultAsync(t => t.Id == facturas.tipo_iva_id);

            if (tipoIva == null)
                return BadRequest("Tipo de IVA inválido");

            
            facturas.iva = facturas.importe * (tipoIva.porcentaje / 100);
            facturas.total = facturas.importe + facturas.iva;

            _context.Facturas.Add(facturas);
            await _context.SaveChangesAsync();

            return Ok(facturas);
        }


        [HttpPost("upload/{id}")]
        public async Task<ActionResult> SubirArchivo(int id, IFormFile? pdf, IFormFile? comprobante)
        {
            var factura = await _context.Facturas.FindAsync(id);
            if (factura == null) return NotFound();

            // Crear carpetas si no existen
            var carpetaPdf = Path.Combine(Directory.GetCurrentDirectory(), "uploads", "facturas");
            var carpetaComp = Path.Combine(Directory.GetCurrentDirectory(), "uploads", "comprobantes");
            Directory.CreateDirectory(carpetaPdf);
            Directory.CreateDirectory(carpetaComp);

            if (pdf != null)
            {
                var nombrePdf = $"{id}_{pdf.FileName}";
                var rutaPdf = Path.Combine(carpetaPdf, nombrePdf);
                using var stream = new FileStream(rutaPdf, FileMode.Create);
                await pdf.CopyToAsync(stream);
                factura.ruta_pdf = $"uploads/facturas/{nombrePdf}";
            }

            if (comprobante != null)
            {
                var nombreComp = $"{id}_{comprobante.FileName}";
                var rutaComp = Path.Combine(carpetaComp, nombreComp);
                using var stream = new FileStream(rutaComp, FileMode.Create);
                await comprobante.CopyToAsync(stream);
                factura.ruta_comprobante = $"uploads/comprobantes/{nombreComp}";
            }

            await _context.SaveChangesAsync();
            return Ok(factura);
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteFacturas(int id)
        {
            var factura = await _context.Facturas.FindAsync(id);
            if (factura == null) return NotFound();

            _context.Facturas.Remove(factura);
            await _context.SaveChangesAsync();
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> PutFacturas(int id, Factura facturas)
        {
            if (id != facturas.Id) return BadRequest();

            _context.Entry(facturas).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return Ok();
        }
    }
}