package com.seekho.api.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import java.time.LocalDate;

@Entity
@Table(name = "payment")
public class Payment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "payment_id")
    private int paymentId;

    @Column(name = "payment_date")
    private LocalDate paymentDate;

    @Column(name = "amount")
    private Double amount;

    /**
     * Many payments belong to one student.
     */
    @ManyToOne
    @JoinColumn(name = "student_id", referencedColumnName = "student_id")
    @JsonBackReference // Prevents infinite recursion during JSON serialization
    private Student student;

    /**
     * Many payments belong to one payment type (like Cash, UPI, etc).
     */
    @ManyToOne
    @JoinColumn(name = "payment_type_id", referencedColumnName = "payment_type_id")
    private PaymentTypeMaster paymentType;

    /**
     * One payment has one receipt.
     */
    @OneToOne(mappedBy = "payment", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private Receipt receipt;

    // --- Getters and Setters ---

    public int getPayment_id() {
        return paymentId;
    }

    public void setPaymentId(int paymentId) {
        this.paymentId = paymentId;
    }

    public LocalDate getPayment_date() {
        return paymentDate;
    }

    public void setPayment_date(LocalDate paymentDate) {
        this.paymentDate = paymentDate;
    }

    public Double getAmount() {
        return amount;
    }

    public void setAmount(Double amount) {
        this.amount = amount;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public PaymentTypeMaster getPayment_type() {
        return paymentType;
    }

    public void setPayment_type(PaymentTypeMaster paymentType) {
        this.paymentType = paymentType;
    }

    public Receipt getReceipt() {
        return receipt;
    }

    public void setReceipt(Receipt receipt) {
        this.receipt = receipt;
    }
}
