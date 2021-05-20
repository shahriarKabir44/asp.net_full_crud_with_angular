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
            var productBought = this.context.Product.Where(x => x.Id == pd).FirstOrDefault();
            var finalChart = new List<DerivedBuyer>();
            foreach (var n in cartsz)
            {
                finalChart.Add(new DerivedBuyer()
                {
                    BuyerDisciplineID = n.Student.DisciplineId,
                    BuyerDiscipline = n.Student.Discipline.Name,
                    BuyerName = n.Student.Name,
                    CustomerID = n.Student.Id,
                    BuyerEmail = n.Student.Email,
                    Offer = n.Offer,
                    ProductID = pd,
                    ProductName = productBought.Name,
                    OwnerName=n.Student1.Name,
                    OwnerId=n.SellerId
                });
            }
            return finalChart;
        }
        public void RemoveUserFromCart(int buyer)
        {
            IEnumerable<Cart> carts = this.context.Cart.Where(x => x.BuyerId == buyer).ToList();
            this.context.Cart.RemoveRange(carts);
            this.context.SaveChanges();
        }
        public void RemoveProduct(int pd)
        {
            IEnumerable<Cart> carts = this.context.Cart.Where(x => x.ProductId == pd).ToList();
            this.context.Cart.RemoveRange(carts);
            this.context.SaveChanges();
        }
        public object GetSubscribed(int buyer)
        {
            var data = this.context.Cart.Include("Product").Where(x => x.BuyerId == buyer).ToList();
            var cust = this.context.Student.Where(x => x.Id == buyer).FirstOrDefault();
            var ret = new List<DerivedBuyer>();
            foreach (var n in data)
            {
                ret.Add(new DerivedBuyer()
                {
                    BuyerDisciplineID = n.Student.DisciplineId,
                    BuyerDiscipline = n.Student.Discipline.Name,
                    BuyerName = n.Student.Name,
                    CustomerID = n.Student.Id,
                    BuyerEmail = n.Student.Email,
                    Offer = n.Offer,
                    ProductID = n.ProductId,
                    ProductName = n.Product.Name,
                    OwnerId=n.Student1.Id,
                    OwnerName=n.Student1.Name
                });
            }
            return ret;
        }
    }
}