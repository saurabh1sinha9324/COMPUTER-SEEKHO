package com.seekho.api.repository;

import com.seekho.api.entity.ClosureReason;
import com.seekho.api.entity.PaymentTypeMaster;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface PaymentTypeRepository extends JpaRepository<PaymentTypeMaster, Integer>{

}

