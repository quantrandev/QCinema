using System.Collections.Generic;

namespace QCinema.Models
{
    public class Genre
    {
        public byte Id { get; set; }
        public string Name { get; set; }
        public ICollection<Movie> Movies { get; set; }
    }
}