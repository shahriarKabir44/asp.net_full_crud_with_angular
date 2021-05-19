using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CrudApp2.Models.DerivedModels;
using CrudApp2.Models;
namespace CrudApp2.Repositories
{
    public class ProductRepository : Repository<Product>
    {
        StudentRepository std;

        public ProductRepository(MarketPlaceEntities2 baseContext) : base(baseContext)
        {
            System.Diagnostics.Debug.WriteLine("prodct Repository");

            std = new StudentRepository(baseContext);
        }

        public List<DerivedProduct> FindByOwner(int owner)
        {
            var datas = this.context.Product.Include("Student").ToList();

            var ret = from pd in datas
                      where pd.OwnerId == owner
                      select new DerivedProduct
                      {
                          Name = pd.Name,
                          Owner = pd.Student.Id,
                          ID = pd.Id,
                          OwnerName = pd.Student.Name
                      };

            return ret.ToList();
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
}