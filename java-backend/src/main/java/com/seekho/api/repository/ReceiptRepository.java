package com.seekho.api.repository;


import com.seekho.api.entity.ClosureReason;
import com.seekho.api.entity.Receipt;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

@Repository
@Transactional
public interface ReceiptRepository extends JpaRepository<Receipt, Integer>{

}

