namespace QCinema.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMovieAndGenreAndFilmFormat : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.FilmFormats",
                c => new
                    {
                        Id = c.Byte(nullable: false, identity: true),
                        Name = c.String(maxLength: 10),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Movies",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        TitleVi = c.String(nullable: false, maxLength: 100),
                        TitleEn = c.String(maxLength: 100),
                        Duration = c.Int(nullable: false),
                        Summary = c.String(maxLength: 2000),
                        Director = c.String(maxLength: 50),
                        Casts = c.String(maxLength: 1000),
                        Image = c.String(),
                        ReleasedDate = c.DateTime(),
                        CreatedDate = c.DateTime(nullable: false),
                        CreatedBy = c.String(nullable: false, maxLength: 128),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Genres",
                c => new
                    {
                        Id = c.Byte(nullable: false, identity: true),
                        Name = c.String(maxLength: 50),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.MovieFilmFormats",
                c => new
                    {
                        MovieId = c.Int(nullable: false),
                        FilmFormatId = c.Byte(nullable: false),
                    })
                .PrimaryKey(t => new { t.MovieId, t.FilmFormatId })
                .ForeignKey("dbo.Movies", t => t.MovieId, cascadeDelete: true)
                .ForeignKey("dbo.FilmFormats", t => t.FilmFormatId, cascadeDelete: true)
                .Index(t => t.MovieId)
                .Index(t => t.FilmFormatId);
            
            CreateTable(
                "dbo.MovieGenres",
                c => new
                    {
                        MovieId = c.Int(nullable: false),
                        GenreId = c.Byte(nullable: false),
                    })
                .PrimaryKey(t => new { t.MovieId, t.GenreId })
                .ForeignKey("dbo.Movies", t => t.MovieId, cascadeDelete: true)
                .ForeignKey("dbo.Genres", t => t.GenreId, cascadeDelete: true)
                .Index(t => t.MovieId)
                .Index(t => t.GenreId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.MovieGenres", "GenreId", "dbo.Genres");
            DropForeignKey("dbo.MovieGenres", "MovieId", "dbo.Movies");
            DropForeignKey("dbo.MovieFilmFormats", "FilmFormatId", "dbo.FilmFormats");
            DropForeignKey("dbo.MovieFilmFormats", "MovieId", "dbo.Movies");
            DropIndex("dbo.MovieGenres", new[] { "GenreId" });
            DropIndex("dbo.MovieGenres", new[] { "MovieId" });
            DropIndex("dbo.MovieFilmFormats", new[] { "FilmFormatId" });
            DropIndex("dbo.MovieFilmFormats", new[] { "MovieId" });
            DropTable("dbo.MovieGenres");
            DropTable("dbo.MovieFilmFormats");
            DropTable("dbo.Genres");
            DropTable("dbo.Movies");
            DropTable("dbo.FilmFormats");
        }
    }
}
