using API_Forum.ViewModel;
using Client.Base.Controllers;
using Client.Repositories.Data;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Client.Controllers
{
    public class RegistersController : BaseController<RegisterVM, RegisterRepository, string>
    {
        private readonly RegisterRepository register;
        public RegistersController(RegisterRepository repository) : base(repository)
        {
            this.register = repository;
        }

        /*[Authorize]*/
        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Register(RegisterVM entity)
        {
            var result = register.Register(entity);
            return Json(result);
        }
    }
}
