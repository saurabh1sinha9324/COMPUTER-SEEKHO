using dotnet_backend.Models;
using dotnet_backend.Repositories;
using Microsoft.EntityFrameworkCore;
using OfficeOpenXml;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace dotnet_backend.Services
{
    public class PlacementService : IPlacementService
    {
        private readonly AppDbContext _context;

        public PlacementService(AppDbContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Placement>> GetAllAsync()
        {
            return await _context.Placements
                .Include(p => p.Recruiter)
                .Include(p => p.Batch)
                .ToListAsync();
        }

        public async Task<Placement?> GetByIdAsync(int id)
        {
            return await _context.Placements
                .Include(p => p.Recruiter)
                .Include(p => p.Batch)
                .FirstOrDefaultAsync(p => p.PlacementId == id);
        }

        public async Task<Placement> CreateAsync(Placement placement)
        {
            _context.Placements.Add(placement);
            await _context.SaveChangesAsync();
            return placement;
        }

        public async Task<bool> UpdateAsync(int id, Placement placement)
        {
            var existing = await _context.Placements.FindAsync(id);
            if (existing == null) return false;

            existing.StudentId = placement.StudentId;
            existing.StudentName = placement.StudentName;
            existing.StudentPhoto = placement.StudentPhoto;
            existing.RecruiterId = placement.RecruiterId;
            existing.BatchId = placement.BatchId;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var existing = await _context.Placements.FindAsync(id);
            if (existing == null) return false;

            _context.Placements.Remove(existing);
            await _context.SaveChangesAsync();
            return true;
        }

        public IEnumerable<Placement> GetPlacementsByBatchId(int batchId)
        {
            return _context.Placements
                           .Where(p => p.BatchId == batchId)
                           .Include(p => p.Recruiter)
                           .Include(p => p.Batch)
                           .ToList();
        }

        // ✅ New: Upload Excel and insert students for a batch
        public async Task<List<Placement>> AddPlacementsFromExcelAsync(int batchId, Stream excelStream)
        {
            ExcelPackage.LicenseContext = LicenseContext.NonCommercial;
            var placements = new List<Placement>();

            using (var package = new ExcelPackage(excelStream))
            {
                var worksheet = package.Workbook.Worksheets[0]; // First sheet
                int rowCount = worksheet.Dimension.Rows;

                for (int row = 2; row <= rowCount; row++) // start from row 2 (skip headers)
                {
                    var studentId = int.Parse(worksheet.Cells[row, 1].Text);
                    var studentName = worksheet.Cells[row, 2].Text;
                    var studentPhoto = worksheet.Cells[row, 3].Text;
                    var recruiterId = int.Parse(worksheet.Cells[row, 4].Text);
                    // BatchId from route, ignore column 5 from file

                    var placement = new Placement
                    {
                        StudentId = studentId,
                        StudentName = studentName,
                        StudentPhoto = studentPhoto,
                        RecruiterId = recruiterId,
                        BatchId = batchId
                    };

                    placements.Add(placement);
                }
            }

            _context.Placements.AddRange(placements);
            await _context.SaveChangesAsync();

            return placements;
        }
    }
}
