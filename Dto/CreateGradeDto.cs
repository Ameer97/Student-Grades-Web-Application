using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ammar.Dto
{
    public class CreateGradeDto
    {
        public int GradeId { get; set; }
        public double Degree { get; set; }
        public string LectureName { get; set; }
        public string StudentName { get; set; }
    }
}
