using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_Forum.Models
{
    [Table("Tb_M_User")]

    public class User
    {
        [Key]
        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public Gender Gender { get; set; }

        public DateTime BirthDate { get; set; }

        public string Phone { get; set; }
        public Status Status { get; set; }
        [JsonIgnore]
        public virtual Account Account { get; set; }
        [JsonIgnore]
        public virtual ICollection<Discussion> Discussions { get; set; }
        [JsonIgnore]
        public virtual ICollection<Comment> Comments { get; set; }
    }

    public enum Gender
    {
        L,
        P
    }

    public enum Status
    {
        on,
        off
    }
}
