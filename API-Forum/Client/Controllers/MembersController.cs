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
    public class MembersController : BaseController<User, MemberRepository, int>
    {
        private readonly MemberRepository repository;

        public MembersController(MemberRepository memberRepository) : base(memberRepository)
        {
            this.repository = memberRepository;
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
