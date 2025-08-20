using dotnet_backend.Models;

namespace dotnet_backend.Services
{
    public interface IStudentService
    {
        IEnumerable<Student> GetAllStudents();
        Student? GetStudentById(int studentId);
        void AddStudent(Student student);
        bool UpdateStudent(Student student);
        void DeleteStudent(int studentId);
    }
}
