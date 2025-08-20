package com.seekho.api.mapper;

import com.seekho.api.dto.PaymentDTO;
import com.seekho.api.entity.Payment;
import com.seekho.api.entity.PaymentTypeMaster;
import com.seekho.api.entity.Receipt;
import com.seekho.api.entity.Student;

import java.time.LocalDate;

public class PaymentMapper {
    public static PaymentDTO toPaymentDTO(Payment payment) {
        PaymentDTO paymentDTO = new PaymentDTO();
        paymentDTO.setPayment_id(payment.getPayment_id());
        paymentDTO.setAmount(payment.getAmount());
        paymentDTO.setPayment_date(payment.getPayment_date());

        Receipt receipt = payment.getReceipt();
        if (receipt != null) {
            paymentDTO.setReceipt_id(receipt.getReceipt_id());

            paymentDTO.setPayment_type(payment.getPayment_type().getPayment_type_id());

        }

        Student student = payment.getStudent();
        if(payment.getStudent() != null) {
            paymentDTO.setStudent_id(student.getStudentId());
        }




        return paymentDTO;

    }
    public static Payment toPayment(PaymentDTO paymentDTO, Student student) {
        Payment payment = new Payment();
        payment.setAmount(paymentDTO.getAmount());
        payment.setPayment_date(paymentDTO.getPayment_date());

        PaymentTypeMaster paymentType = new PaymentTypeMaster();
        paymentType.setPayment_type_id(paymentDTO.getPayment_type());
        payment.setPayment_type(paymentType);

        payment.setStudent(student);

        // Create and link Receipt
        Receipt receipt = new Receipt();
        receipt.setReceipt_amount(paymentDTO.getAmount());
        receipt.setReceipt_date(LocalDate.now());

        payment.setReceipt(receipt);
        receipt.setPayment(payment);

        return payment;
    }



}
