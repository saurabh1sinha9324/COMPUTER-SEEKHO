using dotnet_backend.Models;
using dotnet_backend.Repositories;
using Microsoft.EntityFrameworkCore;

namespace dotnet_backend.Services
{
    public class StudentService : IStudentService
    {
        private readonly AppDbContext _context;

        public StudentService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<Student> GetAllStudents()
        {
            return _context.Students
                .Include(s => s.Batch)
                .Include(s => s.Course)
                .Include(s => s.Enquiry)
                .ToList();
        }

        public Student? GetStudentById(int studentId)
        {
            return _context.Students
                .Include(s => s.Batch)
                .Include(s => s.Course)
                .Include(s => s.Enquiry)
                .FirstOrDefault(s => s.StudentId == studentId);
        }

        public void AddStudent(Student student)
        {
            _context.Students.Add(student);
            _context.SaveChanges();
        }

        public bool UpdateStudent(Student student)
        {
            var existing = _context.Students.FirstOrDefault(s => s.StudentId == student.StudentId);
            if (existing == null) return false;

            _context.Entry(existing).CurrentValues.SetValues(student);
            _context.SaveChanges();
            return true;
        }

        public void DeleteStudent(int studentId)
        {
            var student = _context.Students.FirstOrDefault(s => s.StudentId == studentId);
            if (student != null)
            {
                _context.Students.Remove(student);
                _context.SaveChanges();
            }
        }
    }
}
