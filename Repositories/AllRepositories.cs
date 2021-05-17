using CrudApp2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CrudApp2.Models.DerivedModels;
namespace CrudApp2.Repositories
{
     
    public   class StudentRepository : Repository<Student> {
        DisciplineRepository disciplineRepository = new DisciplineRepository();
        public List<DerivedStudent> GetAllStudents()
        {
            var x = this.GetAll();
            var y = disciplineRepository.GetAll();
            var res = x.Join(
                y,
                stud => stud.DisciplineId,
                disp => disp.Id,
                (stud, disp) => new DerivedStudent
                {
                    Discipline = disp.Name,
                    Name = stud.Name,
                    ID = stud.Id,
                    Email = stud.Email
                }
                );
            return res.ToList();
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
                Email = std.Email
            };
            return res;
        }
         
    
    }
    public class ProductRepository : Repository<Product> {
        StudentRepository std = new StudentRepository();
        public List<DerivedProduct> FindByOwner(int owner)
        {
            var ownerName = this.std.GetStudent(owner).Name;
            var all = this.GetAll();
            var ret = from pd in all
                      where pd.OwnerId == owner
                      select new DerivedProduct
                      {
                           Name= pd.Name,
                           Owner= pd.OwnerId,
                           ID= pd.Id,
                           OwnerName=ownerName
                      };

            return ret.ToList() ;
        }
        public DerivedProduct FindByID(int id)
        { 
            
            var pd = this.Get(id);
            var owner = std.Get(pd.OwnerId);
            return new DerivedProduct
            {
                Name = pd.Name,
                ID = pd.Id,
                Owner = owner.Id,
                OwnerName = owner.Name
            };
           
        }
    }
    public class CartRepository : Repository<Cart> {
        public object GetCustomers(int pd)
        {
            var tm = this.GetAll();
            var carts = from ord in tm
                        where ord.ProductId == pd
                        select ord;
            List<Cart> temp=carts.ToList();
            StudentRepository studentRepository = new StudentRepository();
            var allStudents = studentRepository.GetAllStudents();

            var x = temp.Join(
                    allStudents,
                    order=>order.BuyerId,
                    stud=>stud.ID,
                    (order,stud)=> new
                    {
                        Discipline = stud.Discipline,
                        Name = stud.Name,
                        ID = stud.ID,
                        Email = stud.Email,
                        Offer=order.Offer
                    }
                );
            return x.ToList();
        }

    }
    public class DisciplineRepository : Repository<Discipline> {
    
        public List<DerivedDiscipline> GetDerivedDisciplines()
        {
            var x = from dsc in this.GetAll()
                    select new DerivedDiscipline()
                    {
                        Name = dsc.Name,
                        DisciplineID = dsc.Id
                    };
            return x.ToList();
        }
    }
}