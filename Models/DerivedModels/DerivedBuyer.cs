using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CrudApp2.Models.DerivedModels
{
    public class DerivedBuyer
    {
        public int CustomerID { get; set; }
        public string BuyerName { get; set; }
        public string BuyerEmail { get; set; }
        public string BuyerDiscipline { get; set; }
        public int BuyerDisciplineID { get; set; }
        public int Offer { get; set; }
        public int ProductID { get; set; }
        public string ProductName { get; set; }
        public int OwnerId { get; set; }
        public string OwnerName { get; set; }
    }
}