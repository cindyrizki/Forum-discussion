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
    [Authorize]
    public class AdminsController : BaseController<User, AdminRepository, int>
    {
        private readonly AdminRepository repository;

        public AdminsController(AdminRepository adminRepository) : base(adminRepository)
        {
            this.repository = adminRepository;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Dashboard()
        {
            return View();
        }
    }
}
