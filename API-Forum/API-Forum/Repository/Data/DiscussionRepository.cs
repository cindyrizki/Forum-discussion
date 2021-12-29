using API_Forum.Context;
using API_Forum.Models;
using API_Forum.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Forum.Repository.Data
{
    public class DiscussionRepository : GeneralRepository<MyContext, Discussion, int>
    {
        private readonly MyContext context;
        public DiscussionRepository(MyContext myContext) : base(myContext)
        {
            this.context = myContext;
        }

        public IEnumerable<Discussion> GetAll()
        {
            var data = context.Discussions.Where(p => p.Status == Status.on).ToList();
            return data;
        }

        public override int Delete(int id)
        {
            var find = context.Discussions.Find(id);
            find.Status = Status.off;
            var result = context.SaveChanges();
            return result;
        }
    }
}
