using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using CrudApp2.Models;
namespace CrudApp2.Repositories
{
    public class Repository<T> where T:class
    {
        public MarketPlaceEntities2 context;
        public Repository()
        {
            this.context = new MarketPlaceEntities2();
        }
        public void Delete(int Id)
        {
            this.context.Set<T>().Remove(this.Get(Id));
            this.context.SaveChanges();
        }

        public T Get(int Id)
        {
            return this.context.Set<T>().Find(Id);
        }

        public List<T> GetAll()
        {
            return this.context.Set<T>().ToList();

        }

        public T Insert(T entity)
        {
            this.context.Set<T>().Add(entity);
            this.context.SaveChanges();
            return entity;
        }

        public void Update(T entity)
        {
            this.context.Entry(entity).State = EntityState.Modified;
            this.context.SaveChanges();
        }
    }
}