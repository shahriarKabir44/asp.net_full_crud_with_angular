using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CrudApp2.Models.DerivedModels;
using CrudApp2.Models;
namespace CrudApp2.Repositories
{
    public class CartRepository : Repository<Cart>
    {
         public CartRepository(MarketPlaceEntities2 baseContext) : base(baseContext)
         {
            System.Diagnostics.Debug.WriteLine("cart Repository");
         }

        public List<DerivedBuyer> GetCustomers(int pd)
        {
            
            var cartsz = this.context.Cart.Include("Student").Where(ct => ct.ProductId == pd).ToList();
            var finalChart = new List<DerivedBuyer>();
            foreach(var n in cartsz)
            {
                finalChart.Add(new DerivedBuyer()
                {
                    DisciplineID=n.Student.DisciplineId,
                    Discipline = n.Student.Discipline.Name,
                    Name = n.Student.Name,
                    ID = n.Student.Id,
                    Email = n.Student.Email,
                    Offer = n.Offer
                });
            }
            return finalChart;
        }

    }
}