package com.seekho.api.controller;

import com.seekho.api.dto.PaymentDTO;
import com.seekho.api.entity.Payment;
import com.seekho.api.mapper.PaymentMapper;
import com.seekho.api.service.PaymentService;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/payments")
public class PaymentController {

    private static final Logger logger = LogManager.getLogger(PaymentController.class);

    @Autowired
    private PaymentService paymentService;

    // POST: Create a new payment
    @PostMapping
    public ResponseEntity<PaymentDTO> savePayment(@RequestBody PaymentDTO paymentDTO) {
        logger.info("Saving new payment: {}", paymentDTO);
        Payment savedPayment = paymentService.savePayment(paymentDTO);
        PaymentDTO responseDTO = PaymentMapper.toPaymentDTO(savedPayment);
        logger.info("Saved payment with ID: {}", savedPayment.getPayment_id());
        return ResponseEntity.ok(responseDTO);
    }

    // GET: Get all payments
    @GetMapping
    public ResponseEntity<List<PaymentDTO>> getAllPayments() {
        logger.info("Fetching all payments");
        List<PaymentDTO> payments = paymentService.getAllPayments()
                .stream()
                .map(PaymentMapper::toPaymentDTO)
                .collect(Collectors.toList());
        logger.info("Total payments found: {}", payments.size());
        return ResponseEntity.ok(payments);
    }

    // GET: Get a specific payment by ID
    @GetMapping("/{id}")
    public ResponseEntity<PaymentDTO> getPaymentById(@PathVariable int id) {
        logger.info("Fetching payment by ID: {}", id);
        Payment payment = paymentService.getPaymentById(id);
        return ResponseEntity.ok(PaymentMapper.toPaymentDTO(payment));
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<PaymentDTO>> getPaymentsByStudentId(@PathVariable int studentId) {
        logger.info("Fetching payments for student ID: {}", studentId);
        List<Payment> payments = paymentService.getPaymentsByStudentId(studentId);
        List<PaymentDTO> paymentDTOs = payments.stream()
                .map(PaymentMapper::toPaymentDTO)
                .toList();
        logger.info("Found {} payments for student ID: {}", paymentDTOs.size(), studentId);
        return ResponseEntity.ok(paymentDTOs);
    }
}

