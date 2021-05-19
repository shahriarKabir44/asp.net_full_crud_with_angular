using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CrudApp2.Models;
using CrudApp2.Repositories;
namespace CrudApp2.Controllers
{
    public class StudentController : BaseController
    {
        StudentRepository studentRepository;
        DisciplineRepository disciplineRepository;

        public StudentController()
        {
            this.studentRepository= new StudentRepository(this.DbContext);
            this.disciplineRepository = new DisciplineRepository(this.DbContext);
        }

        // GET: Student

        [HttpGet]
        public Object GetAll()
        {
            var test = studentRepository.GetAllStudents();

            var ret = Json(test, JsonRequestBehavior.AllowGet);
            return ret;
        }
        [HttpGet]
        public object FindStudent(int id)
        {

            var ret = Json(studentRepository.GetStudent(id), JsonRequestBehavior.AllowGet);
            return ret;
        }
        [HttpPost]
        public object AddNewStudent(Student data)
        {
            var x = this.studentRepository.AddNewStudent(data);
            return Json(x, JsonRequestBehavior.AllowGet);
        }
        [HttpPost]
        public object Update(Student data)
        {
            var x=this.studentRepository.UpdateStudent(data);
            return Json(x,JsonRequestBehavior.AllowGet);

        }
        [HttpGet]
        public int Delete (int id)
        {
            this.studentRepository.DeleteSutdent(id);
            return 1;
        }
    }
}