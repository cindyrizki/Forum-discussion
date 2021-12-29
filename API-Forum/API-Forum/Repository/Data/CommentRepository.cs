using API_Forum.Context;
using API_Forum.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Forum.Repository.Data
{
    public class CommentRepository : GeneralRepository<MyContext, Comment, int>
    {
        private readonly MyContext context;
        public CommentRepository(MyContext myContext) : base(myContext)
        {
            this.context = myContext;
        }

        public IEnumerable<Comment> GetAll()
        {
            var data = context.Comments.Where(p => p.Status == Status.on).ToList();
            return data;
        }
    }
}
