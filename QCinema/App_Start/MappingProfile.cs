using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using AutoMapper;
using QCinema.Areas.Admin.ViewModels;
using QCinema.Models;

namespace QCinema.App_Start
{
    public class MappingProfile:Profile
    {
        public MappingProfile()
        {
            CreateMap<Movie, MovieViewModel>();
            CreateMap<MovieViewModel, Movie>();
        }
    }
}