package com.seekho.api.serviceImpl;

import com.seekho.api.dto.PaymentDTO;
import com.seekho.api.entity.Payment;
import com.seekho.api.entity.Receipt;
import com.seekho.api.entity.Student;
import com.seekho.api.mapper.PaymentMapper;
import com.seekho.api.repository.PaymentRepository;
import com.seekho.api.repository.StudentRepo;
import com.seekho.api.service.PaymentService;
import com.seekho.api.repository.StudentRepo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class PaymentServiceImpl implements PaymentService {

    @Autowired
    private PaymentRepository paymentRepository;

    @Autowired
    private StudentRepo studentRepository;


    @Override
    public Payment savePayment(PaymentDTO paymentDTO) {
        // Fetch the student entity
        Student student = studentRepository.findById(paymentDTO.getStudent_id())
                .orElseThrow(() -> new RuntimeException("Student not found with ID: " + paymentDTO.getStudent_id()));

        // Map DTO to Entity (mapper already sets receipt)
        Payment payment = PaymentMapper.toPayment(paymentDTO, student);

        // ✅ Reduce student payment due
        double currentDue = student.getPaymentDue();
        double amountPaid = payment.getAmount();

        if (amountPaid > currentDue) {
            throw new RuntimeException("Paid amount exceeds payment due.");
        }

        student.setPaymentDue(currentDue - amountPaid);
        studentRepository.save(student); // Save updated due

        // Save payment (receipt is saved due to cascade)
        return paymentRepository.save(payment);
    }



    @Override
    public List<Payment> getAllPayments() {
        return paymentRepository.findAll();
    }

    @Override
    public Payment getPaymentById(int id) {
        return paymentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Payment not found with ID: " + id));
    }

    private String generateReceiptNumber() {
        return "RCPT-" + System.currentTimeMillis();
    }


    @Override
    public List<Payment> getPaymentsByStudentId(int studentId) {
        // Optional: throw error if student doesn't exist
        if (!studentRepository.existsById(studentId)) {
            throw new RuntimeException("Student not found with ID: " + studentId);
        }
        return paymentRepository.findByStudentStudentId(studentId);
    }


}

