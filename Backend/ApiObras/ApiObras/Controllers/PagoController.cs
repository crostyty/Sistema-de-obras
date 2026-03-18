using ApiObras.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiObras.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class PagoController : ControllerBase
    {

        private readonly AppDbContext _context; 

        public PagoController(AppDbContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Pago>>> GetTipoPago()
        {
            return await _context.Pagos.ToListAsync();
        }
    }
}
