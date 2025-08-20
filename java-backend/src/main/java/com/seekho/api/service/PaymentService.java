package com.seekho.api.service;

import com.seekho.api.dto.PaymentDTO;
import com.seekho.api.entity.Payment;

import java.util.List;

public interface PaymentService {
    Payment savePayment(PaymentDTO paymentDTO);
    List<Payment> getAllPayments();
    Payment getPaymentById(int id);

    List<Payment> getPaymentsByStudentId(int studentId);

}
