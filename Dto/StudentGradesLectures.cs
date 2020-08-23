using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Ammar.Dto
{
    public class StudentGradesLectures
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public Guid Guid { get; set; }
        public List<StudentGrades> Grades { get; set; }
    }
}
