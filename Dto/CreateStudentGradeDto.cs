using System;
using System.Linq;
using System.Threading.Tasks;

namespace Ammar.Dto
{
    public class CreateStudentGradeDto
    {
        public int StudentId { get; set; }
        public int LectureId { get; set; }
        public double Degree { get; set; }
    }
}
