package com.seekho.api.serviceImpl;

import com.seekho.api.dto.ReceiptDTO;
import com.seekho.api.entity.Receipt;
import com.seekho.api.mapper.ReceiptMapper;
import com.seekho.api.repository.ReceiptRepository;
import com.seekho.api.service.ReceiptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ReceiptServiceImpl implements ReceiptService {

    @Autowired
    private ReceiptRepository receiptRepository;

    @Override
    public List<ReceiptDTO> getAllReceipts() {
        List<Receipt> receipts = receiptRepository.findAll();
        return receipts.stream()
                .map(ReceiptMapper::toDTO)
                .collect(Collectors.toList());
    }

    @Override
    public ReceiptDTO getReceiptById(int id) {
        Optional<Receipt> optionalReceipt = receiptRepository.findById(id);
        return optionalReceipt.map(ReceiptMapper::toDTO).orElse(null);
    }
}
