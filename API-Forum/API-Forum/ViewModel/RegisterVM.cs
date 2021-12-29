using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API_Forum.ViewModel
{
    public class RegisterVM
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Gender Gender { get; set; }

        public DateTime BirthDate { get; set; }

        public string Phone { get; set; }

        public string Password { get; set; }

        public int RoleId { get; set; }
    }

    public enum Gender
    {
        L,
        P
    }
}
