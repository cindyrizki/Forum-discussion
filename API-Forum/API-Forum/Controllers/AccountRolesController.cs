using API_Forum.Controllers.Base;
using API_Forum.Models;
using API_Forum.Repository.Data;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Forum.Controllers
{
    public class AccountRolesController : BaseController<AccountRole, AccountRoleRepository, int>
    {
        public AccountRolesController(AccountRoleRepository accountRoleRepository) : base(accountRoleRepository)
        {

        }
    }
}
