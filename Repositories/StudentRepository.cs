using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CrudApp2.Models.DerivedModels;
using CrudApp2.Models;
namespace CrudApp2.Repositories
{
    public class StudentRepository : Repository<Student>
    {

        DisciplineRepository disciplineRepository;


        public StudentRepository(MarketPlaceEntities2 baseContext) : base(baseContext)
        {
            System.Diagnostics.Debug.WriteLine("student Repository");
            disciplineRepository = new DisciplineRepository(baseContext);
        }

        public List<DerivedStudent> GetAllStudents()
        {


            var stdList = this.context.Student.Include("Discipline").ToList();

            List<DerivedStudent> res = new List<DerivedStudent>();
            foreach (var std in stdList)
            {
                res.Add(new DerivedStudent()
                {
                    Discipline = std.Discipline.Name,
                    Name = std.Name,
                    ID = std.Id,
                    Email = std.Email,
                    DisciplineID = std.DisciplineId
                });
            }
            return res;
        }
        public DerivedStudent AddNewStudent(Student std)
        {
            Student newStudent = this.Insert(std);
            var discipline = this.disciplineRepository.Get(newStudent.DisciplineId);
            return new DerivedStudent()
            {
                Name = newStudent.Name,
                Email = newStudent.Email,
                ID = newStudent.Id,
                Discipline = discipline.Name,
                DisciplineID = discipline.Id
            };
        }
        public DerivedStudent GetStudent(int id)
        {
            var std = this.Get(id);
            var discs = disciplineRepository.Get(std.DisciplineId);
            var res = new DerivedStudent
            {
                Discipline = discs.Name,
                Name = std.Name,
                ID = std.Id,
                Email = std.Email,
                DisciplineID = discs.Id
            };
            return res;
        }

        public DerivedStudent UpdateStudent(Student std)
        {
            var updated = this.Update(std);

            return new DerivedStudent()
            {
                Name = updated.Name,
                ID = updated.Id,
                Email = updated.Email,
                DisciplineID = updated.DisciplineId,
                Discipline = this.disciplineRepository.Get(updated.DisciplineId).Name
            };
        }
        public int DeleteSutdent(int id)
        {
            // IEnumerable<Cart> carts = this.context.Cart.Where(x => x.BuyerId == id).ToList();

            // this.context.Cart.RemoveRange(carts);
            //this.context.SaveChanges();
            return 1;
        }

    }
}