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
                .ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Factura>> PostFacturas(Factura facturas)
        {
            _context.Facturas.Add(facturas);
            await _context.SaveChangesAsync();
            return Ok(facturas);
        }
    }
}