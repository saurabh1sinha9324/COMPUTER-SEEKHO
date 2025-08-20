package com.seekho.api.controller;

import com.seekho.api.dto.ReceiptDTO;
import com.seekho.api.service.ReceiptService;
import com.seekho.api.utility.PdfReceiptGenerator;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/receipt")
public class ReceiptController {

    @Autowired
    private ReceiptService receiptService;

    @GetMapping
    public List<ReceiptDTO> getAllReceipts() {
        return receiptService.getAllReceipts();
    }

    @GetMapping("/{id}")
    public ReceiptDTO getReceiptById(@PathVariable int id) {
        return receiptService.getReceiptById(id);
    }

    @GetMapping("/{id}/pdf")
    public void getReceiptPdf(@PathVariable int id, HttpServletResponse response) throws IOException {
        ReceiptDTO receipt = receiptService.getReceiptById(id);
        if (receipt == null) {
            response.setStatus(HttpServletResponse.SC_NOT_FOUND);
            response.getWriter().write("Receipt not found");
            return;
        }

        ByteArrayOutputStream pdf = PdfReceiptGenerator.generateReceiptPDF(
                receipt.getReceipt_id() + "",
                receipt.getReceipt_date().toString(),
                receipt.getReceipt_amount(),
                receipt.getPayment_id(),
                receipt.getStudent_id()
        );


        response.setContentType("application/pdf");
        response.setHeader("Content-Disposition", "attachment; filename=receipt_" + id + ".pdf");
        response.getOutputStream().write(pdf.toByteArray());
    }
}
