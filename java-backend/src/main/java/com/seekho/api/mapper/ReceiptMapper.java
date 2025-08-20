package com.seekho.api.mapper;

import com.seekho.api.dto.ReceiptDTO;
import com.seekho.api.entity.Payment;
import com.seekho.api.entity.Receipt;
import com.seekho.api.entity.Student;

public class ReceiptMapper {
    public static ReceiptDTO toDTO(Receipt receipt) {
        ReceiptDTO dto = new ReceiptDTO();

        // From Receipt entity
        dto.setReceipt_id(receipt.getReceipt_id());
        dto.setReceipt_date(receipt.getReceipt_date());
        dto.setReceipt_amount(receipt.getReceipt_amount());

        // From Payment entity (via @OneToOne)
        Payment payment = receipt.getPayment();
        if (payment != null) {
            dto.setPayment_id(payment.getPayment_id());
            dto.setPayment_date(payment.getPayment_date());
            dto.setAmount(payment.getAmount());
            dto.setPayment_type(payment.getPayment_type().getPayment_type_id()); 
            dto.setStudent_id(payment.getStudent().getStudentId());

        }

        return dto;
    }
}
