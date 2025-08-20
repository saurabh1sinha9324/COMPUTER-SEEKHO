
using dotnet_backend.Models;
using dotnet_backend.Repositories;
using Microsoft.EntityFrameworkCore;

namespace dotnet_backend.Services
{
    public class CourseService : ICourseService
    {
        private readonly AppDbContext _context;

        public CourseService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Course>> GetAllAsync()
        {
            return await _context.Courses.ToListAsync();
        }

        public async Task<Course?> GetByIdAsync(int id)
        {
            return await _context.Courses.FindAsync(id);
        }

        public async Task<Course> CreateAsync(Course course)
        {
            _context.Courses.Add(course);
            await _context.SaveChangesAsync();
            return course;
        }

        public async Task<Course?> UpdateAsync(int id, Course updatedCourse)
        {
            var existingCourse = await _context.Courses.FindAsync(id);
            if (existingCourse == null) return null;

            existingCourse.CourseDescription = updatedCourse.CourseDescription;
            existingCourse.CourseDuration = updatedCourse.CourseDuration;
            existingCourse.CourseFee = updatedCourse.CourseFee;
            existingCourse.CourseIsActive = updatedCourse.CourseIsActive;
            existingCourse.CourseName = updatedCourse.CourseName;
            existingCourse.CourseSyllabus = updatedCourse.CourseSyllabus;
            existingCourse.CoverPhoto = updatedCourse.CoverPhoto;
            existingCourse.AgeGrpType = updatedCourse.AgeGrpType;

            await _context.SaveChangesAsync();
            return existingCourse;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var course = await _context.Courses.FindAsync(id);
            if (course == null) return false;

            _context.Courses.Remove(course);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
