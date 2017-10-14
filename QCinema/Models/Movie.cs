using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCinema.Models
{
    public class Movie
    {
        public Movie()
        {
            CreatedDate = DateTime.Now;
        }
        public int Id { get; set; }
        public string TitleVi { get; set; }
        public string TitleEn { get; set; }
        public int Duration { get; set; }
        public string Summary { get; set; }
        public string Director { get; set; }
        public string Casts { get; set; }
        public string Image { get; set; }
        public DateTime? ReleasedDate { get; set; }
        public DateTime CreatedDate { get; set; }
        public string CreatedBy { get; set; }
        public ICollection<Genre> Genres { get; set; }
        public ICollection<FilmFormat> FilmFormats { get; set; }

        public void UploadImage(HttpPostedFileBase postedFile, string path)
        {
            postedFile.SaveAs(path);
            Image = path;
        }
    }
}