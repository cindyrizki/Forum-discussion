using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;

namespace API_Forum.ViewModel
{
    public class ProfileVM
    {
        public int UserId { get; set; }
        
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Gender Gender { get; set; }

        public DateTime BirthDate { get; set; }

        public string Phone { get; set; }
    }
}
