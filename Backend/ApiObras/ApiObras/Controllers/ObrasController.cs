using ApiObras.Model;
using Microsoft.AspNetCore.Mvc;
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
        public async Task<ActionResult<IEnumerable<Obra>>> GetObras()
        {
            return await _context.Obras.ToListAsync();
        }

        [HttpPost]
        public async Task<ActionResult<Obra>> PostObra(Obra obra)
        {
            _context.Obras.Add(obra);
            await _context.SaveChangesAsync();
            return Ok(obra);
        }
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteObras(int id)
        {
            var obra = await _context.Obras.FindAsync(id);

            if (obra == null)
                return NotFound();

            _context.Obras.Remove(obra);
            await _context.SaveChangesAsync();
            return NoContent();
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutObras(int id, Obra obra)
        { 
            if(id !=obra.Id)
                return BadRequest();

            _context.Entry(obra).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}