using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Ammar.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string GuId { get; set; }
        public string Name { get; set; }
        public List<Grade> Grades { get; set; }

        public Student()
        {
            this.GuId = Common.Common.MD5(Guid.NewGuid().ToString());
        }
    }
}
