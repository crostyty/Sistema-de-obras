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
    }
}
