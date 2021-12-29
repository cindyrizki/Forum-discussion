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
    public class DiscussionsController : BaseController<Discussion, DiscussionRepository, int>
    {
        private readonly DiscussionRepository discussion;
        public DiscussionsController(DiscussionRepository discussionRepository) : base(discussionRepository)
        {
            this.discussion = discussionRepository;
        }

        [HttpGet("GetAll")]
        public ActionResult GetAll()
        {
            var result = discussion.GetAll();
            return Ok(result);
        }

        [HttpDelete("Delete/{id}")]
        public ActionResult DeleteUser(int id)
        {
            var result = discussion.Delete(id);
            return Ok(result);
        }
    }
}
