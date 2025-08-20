package com.seekho.api.repository;


import com.seekho.api.entity.ClosureReason;
import com.seekho.api.entity.Payment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;


import java.util.List;

@Repository
@Transactional
public interface PaymentRepository extends JpaRepository<Payment, Integer> {
    List<Payment> findByStudentStudentId(int studentId);

}
