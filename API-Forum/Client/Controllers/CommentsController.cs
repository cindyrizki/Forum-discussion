using API_Forum.Models;
using Client.Base.Controllers;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Controllers
{
    public class CommentsController : BaseController<Comment, CommentRepository, int>
    {
        private readonly CommentRepository comment;
        public CommentsController(CommentRepository repository) : base(repository)
        {
            this.comment = repository;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Comment(Comment entity)
        {
            var result = comment.Comment(entity);
            return Json(result);
        }

        public async Task<JsonResult> GetComments()
        {
            var result = await comment.GetComments();
            return Json(result);
        }
    }
}
