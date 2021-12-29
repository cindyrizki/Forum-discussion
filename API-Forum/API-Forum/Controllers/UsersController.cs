using API_Forum.Controllers.Base;
using API_Forum.Models;
using API_Forum.Repository.Data;
using API_Forum.ViewModel;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Net;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace API_Forum.Controllers
{
    public class UsersController : BaseController<User, UserRepository, int>
    {
        private readonly UserRepository user;
        public IConfiguration _configuration;
        public UsersController(UserRepository userRepository, IConfiguration configuration) : base(userRepository)
        {
            this.user = userRepository;
            this._configuration = configuration;
        }

        [Route("Register")]
        [HttpPost]
        public ActionResult Register(RegisterVM registerVM)
        {
            var result = user.Register(registerVM);
            if (result == 2)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Email sudah terdaftar" });
            }
            else if (result == 3)
            {
                return BadRequest(new { status = HttpStatusCode.BadRequest, message = "Nomor telepon sudah terdaftar" });
            }
            else
            {
                return Ok(new { HttpStatusCode.OK });
            }
        }

        [HttpGet("Profile")]
        public ActionResult GetProfile()
        {
            
            var result = user.GetProfileAll();
            return Ok(result);
        }

        [HttpGet("Profile/{Id}")]
        public ActionResult GetProfile(int Id)
        {
            var result = user.GetProfile(Id);
            return Ok(result);
        }

        [HttpPut("ResetPassword")]
        public ActionResult ResetPassword(LoginVM login)
        {
            var result = user.UpdatePassword(login);
            if (result == 0)
            {
                return NotFound(new { status = HttpStatusCode.NotFound, message = "Email tidak terdaftar" });
            }
            else
            {
                return Ok(result);
            }
        }

        [Route("Login")]
        [HttpPost]
        public ActionResult Login(LoginVM loginVM)
        {
            var result = user.Login(loginVM);
            if (result == 0)
            {
                var data = new LoginDataVM()
                {
                    Email = loginVM.Email,
                    Roles = user.GetRole(loginVM)
                };
                var claims = new List<Claim>
                {
                new Claim("email", data.Email)
                };
                foreach (var item in data.Roles)
                {
                    claims.Add(new Claim("roles", item.ToString()));
                }
                var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
                var signIn = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
                var token = new JwtSecurityToken(
                            _configuration["Jwt:Issuer"],
                            _configuration["Jwt:Audience"],
                            claims,
                            expires: DateTime.UtcNow.AddMinutes(30),
                            signingCredentials: signIn
                            );
                var idtoken = new JwtSecurityTokenHandler().WriteToken(token);
                claims.Add(new Claim("TokenSecurity", idtoken.ToString()));
                return Ok(new JWTokenVM { Messages = "Login Berhasil", Token = idtoken, UserId = user.GetId(loginVM), FullName = user.GetFullName(loginVM) });
            }
            else if (result == 1)
            {
                return BadRequest(new JWTokenVM { Messages = "Email/Password Salah", Token = null });
            }
            else
            {
                return BadRequest(new JWTokenVM { Messages = "Email/Password Salah", Token = null });
            }
        }

        [HttpDelete("Delete/{id}")]
        public ActionResult DeleteUser(int id)
        {
            var result = user.Delete(id);
            return Ok(result);
        }

        [HttpGet("GetTrending")]
        public ActionResult GetTrending()
        {
            var result = user.GetTrending();
            return Ok(result);
        }

        [HttpGet("GetDiscussion")]
        public ActionResult GetDiscussion()
        {
            var result = user.GetDiscussion();
            return Ok(result);
        }

        [HttpGet("GetDiscussionId/{id}")]
        public ActionResult GetDiscussionId(int id)
        {
            var result = user.GetDiscussionId(id);
            return Ok(result);
        }

        [HttpGet("GetDiscussionByCat/{id}")]
        public ActionResult GetDiscussionByCat(int id)
        {
            var result = user.GetDiscussionByCat(id);
            return Ok(result);
        }

        [HttpGet("GetDiscussionByUser/{id}")]
        public ActionResult GetDiscussionByUser(int id)
        {
            var result = user.GetDiscussionByUser(id);
            return Ok(result);
        }

        [HttpGet("GetComment/{id}")]
        public ActionResult GetComment(int id)
        {
            var result = user.GetComment(id);
            return Ok(result);
        }

        [HttpGet]
        [Route("Replies")]
        public ActionResult GetReplies()
        {
            var getReplies = user.GetReplies();

            if (getReplies != null)
            {
                return Ok(getReplies);
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.OK, result = getReplies, message = "Tidak ada data tampil" });
            }
        }

        [HttpGet]
        [Route("Replies/{id}")]
        public ActionResult GetReply(int id)
        {
            var getReplies = user.GetReply(id);

            if (getReplies != null)
            {
                return Ok(getReplies);
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.OK, result = getReplies, message = "Tidak ada data tampil" });
            }
        }

        [HttpGet]
        [Route("Gender")]
        public ActionResult GetGender()
        {
            var getGender = user.GetGender();

            if (getGender != null)
            {
                return Ok(getGender);
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.OK, result = getGender, message = "Tidak ada data tampil" });
            }
        }

        [HttpGet]
        [Route("UserDis")]
        public ActionResult GetUserDis()
        {
            var getUserDis = user.GetUserDis();

            if (getUserDis != null)
            {
                return Ok(getUserDis);
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.OK, result = getUserDis, message = "Tidak ada data tampil" });
            }
        }

        [HttpGet]
        [Route("CatDis")]
        public ActionResult GetCatDis()
        {
            var getCatDis = user.GetCatDis();

            if (getCatDis != null)
            {
                return Ok(getCatDis);
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.OK, result = getCatDis, message = "Tidak ada data tampil" });
            }
        }

        [HttpGet]
        [Route("Views")]
        public ActionResult GetViews()
        {
            var getViews = user.GetViews();

            if (getViews != null)
            {
                return Ok(getViews);
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.OK, result = getViews, message = "Tidak ada data tampil" });
            }
        }

        [HttpGet]
        [Route("GetCategory/{categoryName}")]
        public ActionResult GetCategory(string categoryName)
        {
            var getCategory = user.GetCategory(categoryName);
            if (getCategory != null)
            {
                return Ok(getCategory);
            }
            else
            {
                return NotFound(new { status = HttpStatusCode.NotFound, result = getCategory, message = "Tidak ada data tampil" });
            }
        }

        [HttpGet("GetNewByDate")]
        public ActionResult GetNewByDate()
        {
            var result = user.GetNewByDate();
            return Ok(result);
        }

        [HttpGet("CheckAccountRole/{id}")]
        public ActionResult CheckAccountRole(int id)
        {
            var result = user.CheckAccoutRole(id);
            return Ok(result);
        }
    }
}
