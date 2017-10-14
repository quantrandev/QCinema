using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using Microsoft.AspNet.Identity;
using QCinema.Areas.Admin.ViewModels;
using QCinema.Models;

namespace QCinema.Areas.Admin.Controllers
{
    public class MovieController : Controller
    {
        [Authorize]
        // GET: Admin/Movie
        public ActionResult Create()
        {
            using (var db = new ApplicationDbContext())
            {
                ViewBag.Genres = db.Genres.ToList();
                ViewBag.FilmFormats = db.FilmFormats.ToList();
            }

            return View();
        }

        [HttpPost]
        public ActionResult Create(MovieViewModel model)
        {
            if (ModelState.IsValid)
            {
                var movie = Mapper.Map<Movie>(model);
                movie.CreatedBy = User.Identity.GetUserId();

                //upload image 
                if (!string.IsNullOrEmpty(Request.Files[0].FileName))
                {
                    movie.UploadImage(Request.Files[0], Server.MapPath("~/Images/Movies/" + Request.Files[0].FileName));
                }

                using (var db = new ApplicationDbContext())
                {
                    //insert data into many to many relationship tables
                    movie.Genres = model.SelectedGenres == null ? null : db.Genres
                        .Where(g => model.SelectedGenres.Contains(g.Id.ToString()))
                        .ToList(); ;
                    movie.FilmFormats = model.SelectedFilmFormats == null ? null : db.FilmFormats
                        .Where(g => model.SelectedFilmFormats.Contains(g.Id.ToString()))
                        .ToList(); ;

                    db.Movies.Add(movie);
                    db.SaveChanges();

                    return RedirectToAction("Index", "Home");
                }

            }

            //model is not valid
            using (var db = new ApplicationDbContext())
            {
                ViewBag.Genres = db.Genres.ToList();
                ViewBag.FilmFormats = db.FilmFormats.ToList();
            }
            return View();
        }
    }
}