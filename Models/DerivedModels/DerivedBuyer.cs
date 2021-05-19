using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudApp2.Models.DerivedModels
{
    public class DerivedBuyer
    {
        public int ID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public string Discipline { get; set; }
        public int DisciplineID { get; set; }
        public int Offer { get; set; }
    }
}