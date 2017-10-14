using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace QCinema.Areas.Admin.ViewModels
{
    public class MovieViewModel
    {
        public int Id { get; set; }
        public string TitleVi { get; set; }
        public string TitleEn { get; set; }
        public int Duration { get; set; }
        public string Summary { get; set; }
        public string Director { get; set; }
        public string Casts { get; set; }
        public string Image { get; set; }
        public DateTime? ReleasedDate { get; set; }
    }
}