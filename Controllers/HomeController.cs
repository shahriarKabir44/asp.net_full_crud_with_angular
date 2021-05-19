using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CrudApp2.Repositories;
using CrudApp2.Models;

namespace CrudApp2.Controllers
{

    public class HomeController : BaseController
    {

        StudentRepository studentRepository;
        DisciplineRepository disciplineRepository;

        public HomeController()
        {
            this.studentRepository = new StudentRepository(this.DbContext);
            this.disciplineRepository = new DisciplineRepository(this.DbContext);
        }

        // GET: Home
        public   ActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public object GetAllDisciplines()
        {
            var ret = disciplineRepository.GetDerivedDisciplines();
            return Json(ret, JsonRequestBehavior.AllowGet);
        }


    }
}