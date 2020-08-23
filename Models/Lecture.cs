using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ammar.Models
{
    public class Lecture
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public List<Grade> Grades { get; set; }
    }
}
