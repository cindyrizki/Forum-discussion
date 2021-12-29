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
    public class CategoriesController : BaseController<Category, CategoryRepository, int>
    {
        private readonly CategoryRepository category;

        public CategoriesController(CategoryRepository categoryRepository) : base(categoryRepository)
        {
            this.category = categoryRepository;
        }

        public IActionResult Index()
        {
            return View();
        }

        public JsonResult Category(Category entity)
        {
            var result = category.Category(entity);
            return Json(result);
        }
    }
}
