using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudApp2.Models.DerivedModels
{
    public class DerivedProduct
    {
        public int ID { get; set; }
        public int Owner { get; set; }
        public string Name { get; set; }
        public string OwnerName { get; set; }
    }
}