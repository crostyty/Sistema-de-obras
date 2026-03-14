using ApiObras.Model;
using Microsoft.AspnNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ApiObras.Controllers
{
    [ApiController]
    [Route("api/[controller]")]

    public class ObrasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ObrasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Obras>>> GetObras()
        {
            return await _context.Obras.ToListAsync();
        }
        [HttpPost]
        public async Task<ActionResult<Obras>> PostObras(Obras obra)
        {
            _context.Obras.add(obra);
            await _context.SaveChangesAsync();
            return ok(obra);
        }
    }
}