package com.seekho.api.serviceImpl;

import com.seekho.api.dto.CampusLifeDto;
import com.seekho.api.entity.CampusLife;
import com.seekho.api.mapper.CampusLifeMapper;
import com.seekho.api.repository.CampusLifeRepository;
import com.seekho.api.service.CampusLifeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CampusLifeServiceImpl implements CampusLifeService
{

    @Autowired
    private CampusLifeRepository campusLifeRepository;

    @Override
    public CampusLifeDto createCampusLife(CampusLifeDto dto)
    {
        CampusLife entity = CampusLifeMapper.toEntity(dto);
        CampusLife saved = campusLifeRepository.save(entity);
        return CampusLifeMapper.toDto(saved);
    }

    @Override
    public List<CampusLifeDto> getAllCampusLife()
    {
        return campusLifeRepository.findAll()
                .stream()
                .map(CampusLifeMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public CampusLifeDto getCampusLifeById(Long id)
    {
        return campusLifeRepository.findById(id)
                .map(CampusLifeMapper::toDto)
                .orElse(null);
    }

    @Override
    public CampusLifeDto updateCampusLife(Long id, CampusLifeDto dto)
    {
        CampusLife existing = campusLifeRepository.findById(id).orElse(null);
        if (existing == null) return null;

        existing.setTitle(dto.getTitle());
        existing.setDescription(dto.getDescription());
        existing.setImageUrl(dto.getImageUrl());

        CampusLife updated = campusLifeRepository.save(existing);
        return CampusLifeMapper.toDto(updated);
    }

    @Override
    public void deleteCampusLife(Long id) {
        campusLifeRepository.deleteById(id);
    }
}

