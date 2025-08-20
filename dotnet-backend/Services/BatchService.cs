using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using dotnet_backend.Repositories;
using dotnet_backend.Models;

namespace dotnet_backend.Services
{
    public class BatchService : IBatchService
    {
        private readonly AppDbContext _db;
        public BatchService(AppDbContext db) => _db = db;

        public async Task<IEnumerable<Batch>> GetAllAsync()
        {
            return await _db.Batches
                .Include(b => b.Course)
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<Batch?> GetByIdAsync(int id)
        {
            return await _db.Batches
                .Include(b => b.Course)
                .FirstOrDefaultAsync(b => b.BatchId == id);
        }

        public async Task<Batch?> CreateAsync(Batch batch)
        {
            // validate course exists
            var course = await _db.Courses.FindAsync(batch.CourseId);
            if (course == null) return null;

            _db.Batches.Add(batch);
            await _db.SaveChangesAsync();
            // load navigation
            await _db.Entry(batch).Reference(b => b.Course).LoadAsync();
            return batch;
        }

        public async Task<Batch?> UpdateAsync(int id, Batch batch)
        {
            var existing = await _db.Batches.FindAsync(id);
            if (existing == null) return null;

            // validate course exists
            var course = await _db.Courses.FindAsync(batch.CourseId);
            if (course == null) return null;

            existing.BatchName = batch.BatchName;
            existing.BatchPhoto = batch.BatchPhoto;
            existing.BatchStartTime = batch.BatchStartTime;
            existing.BatchEndTime = batch.BatchEndTime;
            existing.CourseId = batch.CourseId;
            existing.BatchIsActive = batch.BatchIsActive;
            existing.BatchPlacedPercent = batch.BatchPlacedPercent;

            await _db.SaveChangesAsync();

            await _db.Entry(existing).Reference(b => b.Course).LoadAsync();
            return existing;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var entity = await _db.Batches.FindAsync(id);
            if (entity == null) return false;
            _db.Batches.Remove(entity);
            await _db.SaveChangesAsync();
            return true;
        }
    }
}
