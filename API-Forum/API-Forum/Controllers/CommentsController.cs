using API_Forum.Controllers.Base;
using API_Forum.Models;
using API_Forum.Repository.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Forum.Controllers
{
    public class CommentsController : BaseController<Comment, CommentRepository, int>
    {
        private readonly CommentRepository comment;
        public CommentsController(CommentRepository commentRepository) : base(commentRepository)
        {
            this.comment = commentRepository;
        }

        [HttpGet("GetAll")]
        public ActionResult GetAll()
        {
            var result = comment.GetAll();
            return Ok(result);
        }
    }
}
