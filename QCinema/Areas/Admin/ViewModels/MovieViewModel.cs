using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace QCinema.Areas.Admin.ViewModels
{
    public class MovieViewModel
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string TitleVi { get; set; }

        [StringLength(100)]
        public string TitleEn { get; set; }

        [Required]
        [Range(60, int.MaxValue)]
        public int Duration { get; set; }

        [StringLength(2000)]
        public string Summary { get; set; }

        [StringLength(50)]
        public string Director { get; set; }

        [StringLength(1000)]
        public string Casts { get; set; }

        public string Image { get; set; }

        public DateTime? ReleasedDate { get; set; }

        public string[] SelectedGenres { get; set; }

        public string[] SelectedFilmFormats { get; set; }
    }
}