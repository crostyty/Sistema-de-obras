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
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Factura>> PostFacturas(Factura facturas)
        {
            _context.Facturas.Add(facturas);
            await _context.SaveChangesAsync();
            return Ok(facturas);
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