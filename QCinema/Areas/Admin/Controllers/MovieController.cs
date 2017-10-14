using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using AutoMapper;
using QCinema.Areas.Admin.ViewModels;
using QCinema.Models;

namespace QCinema.Areas.Admin.Controllers
{
    public class MovieController : Controller
    {
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
    }
}