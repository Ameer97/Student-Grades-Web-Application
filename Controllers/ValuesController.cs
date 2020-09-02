using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.Json;
using System.Threading.Tasks;
using Ammar.DAL;
using Ammar.Dto;
using Ammar.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Ammar.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private SimpleDbContext _context;

        public ValuesController(SimpleDbContext context)
        {
            _context = context;
        }


        // GET: api/<ValuesController>
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var x = await _context.Students.Include(s => s.Grades).ThenInclude(g => g.Lecture)
                .Select(s => new StudentGradesLectures
                {
                    Id = s.Id,
                    Guid = s.GuId,
                    Name = s.Name,
                    Grades = s.Grades.Where(g => g.StudentId == s.Id).Select(g => new StudentGrades
                    {
                        Degree = g.Degree,
                        GradeId = g.Id,
                        IsSuccessed = g.Degree > 50,
                        LectureName = g.Lecture.Name
                    }).ToList()
                }).ToListAsync();

            return Ok(x);
        }

        //// GET api/<ValuesController>/5
        //[HttpGet("{id}")]
        //public string Get(int id)
        //{
        //    return "value";
        //}

        // POST api/Values/students
        [HttpPost]
        public async Task<IActionResult> Students(CreateDto Input)
        {
            var guid = Guid.NewGuid();
            var x = await _context.Students.AddAsync(new Student
            {
                GuId = Common.Common.MD5(guid.ToString()),
                Name = Input.Name
            });
            await _context.SaveChangesAsync();
            var t = new StudentGradesLectures
            {
                Guid = guid.ToString(),
                Id = x.Entity.Id,
                Name = x.Entity.Name
            };
            return Ok(t);
        }

        [HttpPost]
        public async Task<CreateDto> CheckStudent(CreateDto guidStudent)
        {
            var Name = await _context.Students.Where(s => s.GuId == Common.Common.MD5(guidStudent.Name)).Select(s => s.Name).FirstOrDefaultAsync();

            var Result = new CreateDto
            {
                Name = Name
            };
            return Result;
        }

        // POST api/Values/lectures
        [HttpPost]
        public async Task<IActionResult> Lectures(CreateDto Input)
        {
            var x = await _context.Lectures.AddAsync(new Lecture { Name = Input.Name });
            await _context.SaveChangesAsync();

            var l = new LectureDto { Id = x.Entity.Id, Name = x.Entity.Name };

            return Ok(l);
        }

        // POST api/Values/lectures
        [HttpPost]
        public async Task<IActionResult> Grades(CreateStudentGradeDto Input)
        {
            var x = await _context.Grades.AddAsync(new Grade
            {
                Degree = Input.Degree,
                LectureId = Input.LectureId,
                StudentId = Input.StudentId
            });
            await _context.SaveChangesAsync();

            var y = new StudentGrades
            {
                GradeId = x.Entity.Id,
                Degree = x.Entity.Degree,
                LectureName = await _context.Lectures.Where(l => l.Id == x.Entity.LectureId).Select(l => l.Name).FirstOrDefaultAsync(),
                IsSuccessed = x.Entity.Degree >= 50
            };
            return Ok(y);
        }

        [HttpGet]
        public async Task<CreateStudentGradeInput> Data()
        {
            var Result = new CreateStudentGradeInput
            {
                Students = await _context.Students.ToListAsync(),
                Lectures = await _context.Lectures.ToListAsync()
            };
            return Result;
        }

        [HttpGet]
        public async Task<bool> CheckStudentName(string NewStudentName)
        {
            return await _context.Students.Where(s => s.Name == NewStudentName).AnyAsync();
        }

    }
}
