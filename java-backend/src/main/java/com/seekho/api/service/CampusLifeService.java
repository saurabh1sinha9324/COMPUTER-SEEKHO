package com.seekho.api.service;

import com.seekho.api.dto.CampusLifeDto;
import java.util.List;

public interface CampusLifeService {
    CampusLifeDto createCampusLife(CampusLifeDto dto);
    List<CampusLifeDto> getAllCampusLife();
    CampusLifeDto getCampusLifeById(Long id);
    CampusLifeDto updateCampusLife(Long id, CampusLifeDto dto);
    void deleteCampusLife(Long id);
}

