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
    public class TypeDiscussionsController : BaseController<TypeDiscussion, TypeDiscussionRepository, int>
    {
        private readonly TypeDiscussionRepository type;

        public TypeDiscussionsController(TypeDiscussionRepository typeDiscussionRepository) : base(typeDiscussionRepository)
        {
            this.type = typeDiscussionRepository;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult TypeDiscussion(TypeDiscussion entity)
        {
            var result = type.TypeDiscussion(entity);
            return Json(result);
        }
    }
}
