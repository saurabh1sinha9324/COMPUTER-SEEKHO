using dotnet_backend.Models;
using iText.IO.Image;
using iText.Kernel.Colors;
using iText.Kernel.Font;
using iText.Kernel.Pdf;
using iText.Layout;
using iText.Layout.Element;
using iText.Layout.Properties;
using iText.Kernel.Geom;
using iText.IO.Font.Constants;
using System.IO;
using Path = System.IO.Path;
using iText.Layout.Borders;

namespace dotnet_backend.Helpers
{
    public static class ReceiptPdfGenerator
    {
        public static byte[] Generate(Payment payment, string studentName, string courseName)
        {
            using var ms = new MemoryStream();
            using var writer = new PdfWriter(ms);
            using var pdf = new PdfDocument(writer);
            var doc = new Document(pdf, PageSize.A4);
            doc.SetMargins(20, 20, 20, 20);

            // Fonts
            PdfFont regularFont = PdfFontFactory.CreateFont(StandardFonts.HELVETICA);
            PdfFont boldFont = PdfFontFactory.CreateFont(StandardFonts.HELVETICA_BOLD);
            PdfFont italicFont = PdfFontFactory.CreateFont(StandardFonts.HELVETICA_OBLIQUE);

            // Add Logo
            string logoPath = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images", "logo.jpg");
            if (File.Exists(logoPath))
            {
                ImageData logoData = ImageDataFactory.Create(logoPath);
                var logo = new iText.Layout.Element.Image(logoData)
                    .ScaleToFit(120, 120)
                    .SetHorizontalAlignment(HorizontalAlignment.CENTER)
                    .SetMarginBottom(10);
                doc.Add(logo);
            }

            // Academy Name
            doc.Add(new Paragraph("Brain Infotech Academy")
                .SetFont(boldFont)
                .SetFontSize(24)
                .SetFontColor(new DeviceRgb(34, 34, 34))
                .SetTextAlignment(TextAlignment.CENTER)
                .SetMarginBottom(5));

            // Receipt Title
            doc.Add(new Paragraph("Payment Receipt")
                .SetFont(boldFont)
                .SetFontSize(18)
                .SetFontColor(new DeviceRgb(80, 80, 80))
                .SetTextAlignment(TextAlignment.CENTER)
                .SetMarginBottom(20));

            // Table for payment details
            var table = new Table(UnitValue.CreatePercentArray(new float[] { 1, 2 })).UseAllAvailableWidth();
            table.SetMarginBottom(20);

            void AddCell(string header, string value, bool highlight = false, bool alternate = false)
            {
                Color bgColor = alternate ? new DeviceRgb(245, 245, 245) : ColorConstants.WHITE;
                Color valueColor = highlight ? new DeviceRgb(0, 128, 0) : ColorConstants.BLACK;

                // Header Cell
                table.AddCell(new Cell().Add(new Paragraph(header)
                                               .SetFont(boldFont)
                                               .SetFontColor(ColorConstants.WHITE))
                                           .SetBackgroundColor(new DeviceRgb(100, 149, 237)) // soft blue
                                           .SetPadding(8)
                                           .SetBorder(Border.NO_BORDER));

                // Value Cell
                table.AddCell(new Cell().Add(new Paragraph(value)
                                               .SetFont(regularFont)
                                               .SetFontColor(valueColor))
                                           .SetBackgroundColor(bgColor)
                                           .SetPadding(8)
                                           .SetBorder(Border.NO_BORDER));
            }

            AddCell("Receipt No:", payment.PaymentId.ToString());
            AddCell("Date:", payment.PaymentDate?.ToString("yyyy-MM-dd") ?? "", alternate: true);
            AddCell("Student Name:", studentName);
            AddCell("Student ID:", payment.StudentId.ToString(), alternate: true);
            AddCell("Course Name:", courseName);
            AddCell("Amount Paid:", $"₹{payment.Amount}", highlight: true, alternate: true);
            AddCell("Payment Type:", payment.PaymentType);

            doc.Add(table);

            // Footer / Thank you note
            doc.Add(new Paragraph("Thank you for choosing Brain Infotech Academy!")
                .SetFont(italicFont)
                .SetFontSize(12)
                .SetFontColor(new DeviceRgb(90, 90, 90))
                .SetTextAlignment(TextAlignment.CENTER)
                .SetMarginTop(10));

            // Footer line
            doc.Add(new LineSeparator(new iText.Kernel.Pdf.Canvas.Draw.SolidLine(1))
                .SetMarginTop(20)
                .SetMarginBottom(5));

            // Contact info
            doc.Add(new Paragraph("For any queries, contact us at info@braininfotech.com")
                .SetFont(regularFont)
                .SetFontSize(10)
                .SetFontColor(ColorConstants.GRAY)
                .SetTextAlignment(TextAlignment.CENTER));

            doc.Close();
            return ms.ToArray();
        }

        internal static byte[] Generate(Payment payment)
        {
            return Generate(payment, "Sarvesh Jadhav", "PG-DAC");
        }
    }
}
