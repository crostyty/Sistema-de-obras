using ApiObras.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiObras.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class IvaController : ControllerBase
    {
        private readonly AppDbContext _context;

        public IvaController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Iva>>> GetIva()
        {
            return await _context.Ivas.ToListAsync();
        }
        [HttpGet("montoIva")]
        public async Task<ActionResult> GetMonIva()
        {
            var gastosPorIva = await _context.Facturas
                .Where(f => f.tipo_iva_id != null && f.TipoIva.porcentaje !=0)
                .GroupBy(f => f.TipoIva.porcentaje)
                .Select(i => new
                {
                    iva = i.Key,
                    totalIva = i.Sum(f => f.total),
                    acumIva = i.Count()
                }).ToListAsync();
            return Ok(gastosPorIva);
        }
    }
}
