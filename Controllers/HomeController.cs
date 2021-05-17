using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CrudApp2.Repositories;
using CrudApp2.Models;
namespace CrudApp2.Controllers
{
    public class HomeController : Controller
    {
        
        StudentRepository stdrep = new StudentRepository();
        DisciplineRepository dsp = new DisciplineRepository();
        // GET: Home
        public ActionResult Index()
        {
            return View();
        }
        [HttpGet]
        public Object GetAll()
        {
            
            var ret = Json( stdrep.GetAllStudents(), JsonRequestBehavior.AllowGet);
            return ret;
        }
        [HttpGet]
        public object FindStudent(int id)
        {
             
            var ret = Json(stdrep.GetStudent(id), JsonRequestBehavior.AllowGet);
            return ret;
        }
        [HttpGet]
        public object GetAllDisciplines()
        {
            var ret = dsp.GetDerivedDisciplines();
            return Json(ret, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public int AddNewStudent(Student data)
        {
            var x= this.stdrep.Insert(data);
            return x.Id;
        }

    }
}