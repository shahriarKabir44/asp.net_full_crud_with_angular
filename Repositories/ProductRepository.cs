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
        public void DeleteAllProductsOfAUser(int owner)
        {

            IEnumerable<Product> products = this.context.Product.Where(x => x.OwnerId == owner).ToList();
            this.context.Product.RemoveRange(products);
            this.context.SaveChanges();
        }

        public ProductRepository(MarketPlaceEntities2 baseContext) : base(baseContext)
        {
            System.Diagnostics.Debug.WriteLine("prodct Repository");
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

            var pd = this.context.Product.Include("Student").Where(x => x.Id == id).FirstOrDefault();
            return new DerivedProduct
            {
                Name = pd.Student.Name,
                ID = pd.Id,
                Owner = pd.OwnerId,
                OwnerName = pd.Student.Name
            };

        }
        public DerivedProduct AddNew(Product product)
        {
            var pd = this.Insert(product);
            var owner = this.context.Student.Where(x => x.Id == pd.OwnerId).FirstOrDefault();
            return new DerivedProduct()
            {
                Name = pd.Name,
                ID = pd.Id,
                Owner = pd.OwnerId,
                OwnerName = owner.Name
            };
        }

    }
}