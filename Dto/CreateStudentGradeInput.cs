using Ammar.Models;
using System.Collections.Generic;

namespace Ammar.Dto
{
    public class CreateStudentGradeInput
    {
        public List<Student> Students { get; set; }
        public List<Lecture> Lectures { get; set; }
    }
}
