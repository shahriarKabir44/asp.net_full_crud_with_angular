using CrudApp2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CrudApp2.Controllers
{
    public class BaseController : Controller
    {
        public MarketPlaceEntities2 DbContext;

        public BaseController( )
        {
            DbContext = new MarketPlaceEntities2();
        }

        // GET: Base
         
    }
}