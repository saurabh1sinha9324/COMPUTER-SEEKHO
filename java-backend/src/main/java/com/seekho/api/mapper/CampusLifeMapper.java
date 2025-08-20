package com.seekho.api.mapper;

import com.seekho.api.dto.CampusLifeDto;
import com.seekho.api.entity.CampusLife;

public class CampusLifeMapper {

    public static CampusLifeDto toDto(CampusLife entity) {
        return new CampusLifeDto(
                entity.getId(),
                entity.getTitle(),
                entity.getDescription(),
                entity.getImageUrl()
        );
    }

    public static CampusLife toEntity(CampusLifeDto dto) {
        return new CampusLife(
                dto.getId(),
                dto.getTitle(),
                dto.getDescription(),
                dto.getImageUrl()
        );
    }
}
