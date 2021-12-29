using API_Forum.Context;
using API_Forum.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Forum.Repository.Data
{
    public class TypeDiscussionRepository : GeneralRepository<MyContext, TypeDiscussion, int>
    {
        public TypeDiscussionRepository(MyContext myContext) : base(myContext)
        {

        }
    }
}
