using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CrudApp2.Models;
using CrudApp2.Repositories;
namespace CrudApp2.Controllers
{
    public class ProductController : Controller
    {
        StudentRepository studentRepository = new StudentRepository();
        ProductRepository productRepository = new ProductRepository();

        [HttpGet]
        public object GetProductsOf(int owner)
        {
            var x = productRepository.FindByOwner(owner);
            return Json(x, JsonRequestBehavior.AllowGet);
        }

        [HttpGet]
        public object FindProduct(int id)
        {
            var x = productRepository.FindByID(id);
            return Json(x, JsonRequestBehavior.AllowGet);
        }

    }
}