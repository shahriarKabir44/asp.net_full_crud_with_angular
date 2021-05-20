using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CrudApp2.Models;
using CrudApp2.Repositories;
namespace CrudApp2.Controllers
{
    public class CartController : BaseController
    {
        // GET: Cart
        ProductRepository productRepository;
        CartRepository cartRepository ;
        StudentRepository studentRepository  ;

        public CartController()
        {
            this.productRepository = new ProductRepository(this.DbContext);
            cartRepository = new CartRepository(this.DbContext);
            studentRepository = new StudentRepository(this.DbContext);
        }

        [HttpGet]
        public Object GetCustomers(int pd)
        {
            return Json(cartRepository.GetCustomers(pd),JsonRequestBehavior.AllowGet);
        }
        public object GetSubscribed(int id)
        {
            var x = this.cartRepository.GetSubscribed(id);
            return Json(x, JsonRequestBehavior.AllowGet);
        }

    }
}