using CrudApp2.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using CrudApp2.Models.DerivedModels;
namespace CrudApp2.Repositories
{
    public class DisciplineRepository : Repository<Discipline> {
        public DisciplineRepository(MarketPlaceEntities2 baseContext) : base(baseContext)
        {
            System.Diagnostics.Debug.WriteLine("disc Repository");

        }

        public List<DerivedDiscipline> GetDerivedDisciplines()
        {
            var x = from dsc in this.GetAll()
                    select new DerivedDiscipline()
                    {
                        Name = dsc.Name,
                        DisciplineID = dsc.Id
                    };
            return x.ToList();
        }
    }
}