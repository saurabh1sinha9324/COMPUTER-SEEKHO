//package com.seekho.api.entity;
//
//import jakarta.persistence.*;
//import java.time.LocalDate;
//
//@Entity
//@Table(name = "receipt")
//public class Receipt {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    @Column(name = "receipt_id")
//    private int receiptId;
//
//    @Column(name = "receipt_date")
//    private LocalDate receiptDate;
//
//    @Column(name = "receipt_amount")
//    private double receiptAmount;
//
//    @Column(name = "payment_id")
//    private int paymentId;
//
//    // Getters and Setters
//
//    public int getReceiptId() {
//        return receiptId;
//    }
//
//    public void setReceiptId(int receiptId) {
//        this.receiptId = receiptId;
//    }
//
//    public LocalDate getReceiptDate() {
//        return receiptDate;
//    }
//
//    public void setReceiptDate(LocalDate receiptDate) {
//        this.receiptDate = receiptDate;
//    }
//
//    public double getReceiptAmount() {
//        return receiptAmount;
//    }
//
//    public void setReceiptAmount(double receiptAmount) {
//        this.receiptAmount = receiptAmount;
//    }
//
//    public int getPaymentId() {
//        return paymentId;
//    }
//
//    public void setPaymentId(int paymentId) {
//        this.paymentId = paymentId;
//    }
//}

package com.seekho.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "receipt")
public class Receipt {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int receipt_id;

    private LocalDate receipt_date;
    private Double receipt_amount;

//    @OneToOne
//    @JoinColumn(name = "payment_id")
//    private Payment payment;

    @OneToOne
    @JoinColumn(name = "payment_id", referencedColumnName = "payment_id")
    @JsonBackReference
    private Payment payment;


    // Getters and Setters

    public int getReceipt_id() {
        return receipt_id;
    }

    public void setReceipt_id(int receipt_id) {
        this.receipt_id = receipt_id;
    }

    public LocalDate getReceipt_date() {
        return receipt_date;
    }

    public void setReceipt_date(LocalDate receipt_date) {
        this.receipt_date = receipt_date;
    }

    public Double getReceipt_amount() {
        return receipt_amount;
    }

    public void setReceipt_amount(Double receipt_amount) {
        this.receipt_amount = receipt_amount;
    }


    public Payment getPayment() {
        return payment;
    }

    public void setPayment(Payment payment) {
        this.payment = payment;
    }
}

