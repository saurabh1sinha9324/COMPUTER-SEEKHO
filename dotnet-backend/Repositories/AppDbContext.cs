using Microsoft.EntityFrameworkCore;
using dotnet_backend.Models;

namespace dotnet_backend.Repositories
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        { }

        public DbSet<Course> Courses { get; set; } = null!;
        public DbSet<Batch> Batches { get; set; } = null!;
        public DbSet<Recruiter> Recruiters { get; set; } = null!;
        public DbSet<Placement> Placements { get; set; } = null!;
        public DbSet<Enquiry> Enquiries { get; set; } = null;
        public DbSet<Staff> Staffs { get; set; } = null;
        public DbSet<Student> Students { get; set; } = null;
        public DbSet<Payment> Payments { get; set; } = null;
        public DbSet<CampusLife> CampusLife { get; set; } = null!; 
        public DbSet<Faculty> Faculties { get; set; } = null;
        public DbSet<announcement> Announcements { get; set; } = null;



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Batch>()
                .HasOne(b => b.Course)
                .WithMany(c => c.Batches)
                .HasForeignKey(b => b.CourseId)
                .HasConstraintName("fk_batch_course");

            base.OnModelCreating(modelBuilder);
        }
    }
}
