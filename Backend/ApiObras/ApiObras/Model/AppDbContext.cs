using Microsoft.EntityFrameworkCore;

namespace ApiObras.Model
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Proveedores> Proveedores { get; set; }
    }
}
