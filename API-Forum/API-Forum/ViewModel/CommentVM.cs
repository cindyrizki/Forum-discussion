using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Forum.ViewModel
{
    public class CommentVM
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Content { get; set; }
        public DateTime DateCom { get; set; }
    }
}
