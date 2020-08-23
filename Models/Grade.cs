using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace Ammar.Models
{
    public class Grade
    {
        public int Id { get; set; }

        public int StudentId { get; set; }
        [ForeignKey(nameof(StudentId))]
        public Student Student { get; set; }

        public int LectureId { get; set; }
        [ForeignKey(nameof(LectureId))]
        public Lecture Lecture { get; set; }

        public double Degree { get; set; }
    }
}
