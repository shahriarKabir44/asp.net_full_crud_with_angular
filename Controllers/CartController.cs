using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CrudApp2.Models;
using CrudApp2.Repositories;
namespace CrudApp2.Controllers
{
    public class CartController : Controller
    {
        // GET: Cart
        ProductRepository productRepository = new ProductRepository();
        CartRepository cartRepository = new CartRepository();
        StudentRepository studentRepository = new StudentRepository();
        [HttpGet]
        public Object GetCustomers(int pd)
        {
            return Json(cartRepository.GetCustomers(pd),JsonRequestBehavior.AllowGet);
        }

    }
}