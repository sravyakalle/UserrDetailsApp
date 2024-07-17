using Microsoft.CodeAnalysis;
using Microsoft.EntityFrameworkCore;
using WebApiUserApplication.Models;

namespace WebApiUserApplication.Data
{
    public class UserListDbContext : DbContext
    {
        public UserListDbContext(DbContextOptions options) : base(options) { }

        public DbSet<UserDetailsList> UserDetails { get; set; }
    }
}