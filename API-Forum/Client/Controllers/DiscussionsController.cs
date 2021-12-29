using API_Forum.Models;
using Client.Base.Controllers;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Controllers
{
    public class DiscussionsController : BaseController<Discussion, DiscussionRepository, int>
    {
        private readonly DiscussionRepository discussion;

        public DiscussionsController(DiscussionRepository discussionRepository) : base(discussionRepository)
        {
            this.discussion = discussionRepository;
        }

        public IActionResult Index()
        {
            return View();
        }

        [Authorize]
        public IActionResult LihatDiskusi()
        {
            return View();
        }

        [Authorize]
        public IActionResult CreateDiskusi()
        {
            return View();
        }

        public JsonResult Discussion(Discussion entity)
        {
            var result = discussion.Discussion(entity);
            return Json(result);
        }

        public JsonResult DeleteDis(int id)
        {
            var result = discussion.DeleteDis(id);
            return Json(result);
        }
    }
}
