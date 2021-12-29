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
    [Table("Tb_T_Discussion")]

    public class Discussion
    {
        [Key]
        public int DisId { get; set; }

        public string Title { get; set; }

        public string Content { get; set; }

        public DateTime DateDis { get; set; }

        [JsonConverter(typeof(StringEnumConverter))]
        public GenericUriParserOptions StatusComt { get; set; }

        public int Views { get; set; }
        public int UserId { get; set; }
        public int CategoryId { get; set; }
        public int TypeId { get; set; }
        public Status Status { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
        [JsonIgnore]
        public virtual Category Category { get; set; }
        [JsonIgnore]
        [ForeignKey("TypeId")]
        public virtual TypeDiscussion TypeDiscussion { get; set; }
        [JsonIgnore]
        public virtual ICollection<Comment> Comments { get; set; }
    }

    public enum GenericUriParserOptions
    {
       Active,
       Disable
    }
}
