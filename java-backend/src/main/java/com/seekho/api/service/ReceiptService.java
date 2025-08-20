package com.seekho.api.service;

import com.seekho.api.dto.ReceiptDTO;

import java.util.List;

public interface ReceiptService {
    List<ReceiptDTO> getAllReceipts();
    ReceiptDTO getReceiptById(int id);
}
