package com.seekho.api.test;


import com.seekho.api.dto.PaymentDTO;
import com.seekho.api.entity.Payment;
import com.seekho.api.entity.Receipt;
import com.seekho.api.entity.Student;
import com.seekho.api.mapper.PaymentMapper;
import com.seekho.api.repository.PaymentRepository;
import com.seekho.api.repository.StudentRepo;

import com.seekho.api.serviceImpl.PaymentServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class PaymentServiceImplTest {

    @Mock
    private PaymentRepository paymentRepository;

    @Mock
    private StudentRepo studentRepository;

    @InjectMocks
    private PaymentServiceImpl paymentService;

    private AutoCloseable closeable;

    @BeforeEach
    void setUp() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSavePayment_Success() {
        // Mock PaymentDTO
        PaymentDTO paymentDTO = new PaymentDTO();
        paymentDTO.setStudent_id(1);
        paymentDTO.setAmount(100.0);

        // Mock Student
        Student student = new Student();
        student.setStudentId(1);
        student.setPaymentDue(500.0);

        // Mock Payment entity
        Payment payment = new Payment();
        payment.setAmount(100.0);
        payment.setPayment_date(LocalDate.now());
        payment.setStudent(student);

        // Setup mock behaviors
        when(studentRepository.findById(1)).thenReturn(Optional.of(student));
        when(paymentRepository.save(any(Payment.class))).thenReturn(payment);

        // Execute
        Payment result = paymentService.savePayment(paymentDTO);

        // Assert
        assertNotNull(result);
        assertEquals(100.0, result.getAmount());
        assertEquals(400.0, student.getPaymentDue());

        // Verify
        verify(studentRepository).findById(1);
        verify(studentRepository).save(student);
        verify(paymentRepository).save(any(Payment.class));
    }

    @Test
    void testSavePayment_StudentNotFound() {
        PaymentDTO paymentDTO = new PaymentDTO();
        paymentDTO.setStudent_id(99);
        paymentDTO.setAmount(50.0);

        when(studentRepository.findById(99)).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, () ->
                paymentService.savePayment(paymentDTO));

        assertEquals("Student not found with ID: 99", exception.getMessage());
        verify(studentRepository).findById(99);
        verify(studentRepository, never()).save(any());
        verify(paymentRepository, never()).save(any());
    }

    @Test
    void testSavePayment_AmountExceedsDue() {
        PaymentDTO paymentDTO = new PaymentDTO();
        paymentDTO.setStudent_id(1);
        paymentDTO.setAmount(1000.0); // too much

        Student student = new Student();
        student.setStudentId(1);
        student.setPaymentDue(500.0); // only 500 due

        when(studentRepository.findById(1)).thenReturn(Optional.of(student));

        Exception exception = assertThrows(RuntimeException.class, () ->
                paymentService.savePayment(paymentDTO));

        assertEquals("Paid amount exceeds payment due.", exception.getMessage());

        verify(studentRepository).findById(1);
        verify(studentRepository, never()).save(any());
        verify(paymentRepository, never()).save(any());
    }

    // Optional: Add a failing test intentionally
    @Test
    void testSavePayment_FailWrongAmountAssertion() {
        PaymentDTO dto = new PaymentDTO();
        dto.setStudent_id(1);
        dto.setAmount(200.0);

        Student student = new Student();
        student.setStudentId(1);
        student.setPaymentDue(300.0);

        Payment payment = new Payment();
        payment.setAmount(200.0);
        payment.setStudent(student);

        when(studentRepository.findById(1)).thenReturn(Optional.of(student));
        when(paymentRepository.save(any(Payment.class))).thenReturn(payment);

        Payment result = paymentService.savePayment(dto);

        // Intentionally wrong assertion (will fail)
        assertEquals(999.0, result.getAmount(), "Expected to fail because amount is 200.0");
    }
}
