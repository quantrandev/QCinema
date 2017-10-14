using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity;
using Microsoft.AspNet.Identity.EntityFramework;

namespace QCinema.Models
{
    // You can add profile data for the user by adding more properties to your ApplicationUser class, please visit http://go.microsoft.com/fwlink/?LinkID=317594 to learn more.

    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public DbSet<Movie> Movies { get; set; }
        public DbSet<Genre> Genres { get; set; }
        public DbSet<FilmFormat> FilmFormats { get; set; }

        public ApplicationDbContext()
            : base("QCinemaConnection", throwIfV1Schema: false)
        {
            Configuration.ProxyCreationEnabled = false;
        }

        public static ApplicationDbContext Create()
        {
            return new ApplicationDbContext();
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<Movie>()
                .Property(e => e.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            modelBuilder.Entity<Movie>()
                .Property(e => e.TitleVi)
                .HasMaxLength(100)
                .IsRequired()
                .IsUnicode(true);

            modelBuilder.Entity<Movie>()
                .Property(e => e.Duration)
                .IsRequired();

            modelBuilder.Entity<Movie>()
                .Property(e => e.CreatedDate)
                .IsRequired();

            modelBuilder.Entity<Movie>()
                .Property(e => e.CreatedBy)
                .HasMaxLength(128)
                .IsRequired();

            modelBuilder.Entity<Movie>()
                .Property(e => e.TitleEn)
                .HasMaxLength(100);

            modelBuilder.Entity<Movie>()
                .Property(e => e.Director)
                .HasMaxLength(50);

            modelBuilder.Entity<Movie>()
                .Property(e => e.Casts)
                .HasMaxLength(1000);

            modelBuilder.Entity<Movie>()
                .Property(e => e.Summary)
                .HasMaxLength(2000);

            modelBuilder.Entity<Movie>()
                .HasMany(e => e.Genres)
                .WithMany(e => e.Movies)
                .Map(e =>
                {
                    e.ToTable("MovieGenres");
                    e.MapLeftKey("MovieId");
                    e.MapRightKey("GenreId");
                });

            modelBuilder.Entity<Movie>()
                .HasMany(e => e.FilmFormats)
                .WithMany(e => e.Movies)
                .Map(e =>
                {
                    e.ToTable("MovieFilmFormats");
                    e.MapLeftKey("MovieId");
                    e.MapRightKey("FilmFormatId");
                }); ;
            
            modelBuilder.Entity<Genre>()
                .Property(e => e.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            modelBuilder.Entity<Genre>()
                .Property(e => e.Name)
                .HasMaxLength(50);
            
            modelBuilder.Entity<FilmFormat>()
                .Property(e => e.Id)
                .HasDatabaseGeneratedOption(DatabaseGeneratedOption.Identity);

            modelBuilder.Entity<FilmFormat>()
                .Property(e => e.Name)
                .HasMaxLength(10);

        }
    }
}