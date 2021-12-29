using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace API_Forum.Models
{
    [Table("Tb_T_Comment")]

    public class Comment
    {
        [Key]
        public int CommentId { get; set; }

        public string Content { get; set; }

        public DateTime DateComment { get; set; }

        public int UserId { get; set; }

        public int DisId { get; set; }
        public Status Status { get; set; }
        [JsonIgnore]
        public virtual User User { get; set; }
        [JsonIgnore]
        [ForeignKey("DisId")]
        public virtual Discussion Discussion { get; set; }
    }
}
