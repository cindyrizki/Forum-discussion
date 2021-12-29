using API_Forum.Models;
using API_Forum.ViewModel;
using Client.Base.Controllers;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Controllers
{
    public class UsersController : BaseController<User, UserRepository, int>
    {
        private readonly UserRepository user;
        public UsersController(UserRepository repository) : base(repository)
        {
            this.user = repository;
        }

        [Authorize]
        public IActionResult Index()
        {
            return View();
        }

        [Authorize]
        public IActionResult Dashboard()
        {
            return View();
        }

        [Authorize]
        public IActionResult Profile()
        {
            return View();
        }

        [Authorize]
        public IActionResult ProfileAdmin()
        {

            return View();
        }

        public async Task<JsonResult> GetProfile()
        {
            var result = await user.GetProfile();
            return Json(result);
        }

        public async Task<JsonResult> ProfileUser(int id)
        {
            var result = await user.Profile(id);
            return Json(result);
        }

        public JsonResult DeleteUser(int id)
        {
            var result = user.DeleteUser(id);
            return Json(result);
        }

        public async Task<JsonResult> GetLanding()
        {
            var result = await user.GetLanding();
            return Json(result);
        }

        public async Task<JsonResult> GetReplybyId(int id)
        {
            var result = await user.GetReplybyId(id);
            return Json(result);
        }

        public async Task<JsonResult> GetDiscussion(int id)
        {
            var result = await user.GetDiscussionById(id);
            return Json(result);
        }

        public async Task<JsonResult> GetDiscussionByCat(int id)
        {
            var result = await user.GetDiscussionByCat(id);
            return Json(result);
        }
        
        public async Task<JsonResult> GetDiscussionByUser(int id)
        {
            var result = await user.GetDiscussionByUser(id);
            return Json(result);
        }

        public async Task<JsonResult> GetTrending()
        {
            var result = await user.GetTrending();
            return Json(result);
        }

        public async Task<JsonResult> GetCountReply(int id)
        {
            var result = await user.GetCountReply(id);
            return Json(result);
        }

        public async Task<JsonResult> GetNewByDate()
        {
            var result = await user.GetNewByDate();
            return Json(result);
        }

        /*public async Task<JsonResult> GetCategory(string name)
        {
            var result = await user.GetCategory(name);
            return Json(result);
        }*/
    }
}
