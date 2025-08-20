package com.seekho.api.test;

import com.seekho.api.dto.AnnouncementDto;
import com.seekho.api.entity.Announcement;
import com.seekho.api.mapper.AnnouncementMapper;
import com.seekho.api.repository.AnnouncementRepo;
import com.seekho.api.serviceImpl.AnnouncementServiceImpl;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.*;
import java.time.LocalDateTime;
import java.util.*;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class AnnouncementServiceImplTest {

    @Mock
    private AnnouncementRepo repo;

    @InjectMocks
    private AnnouncementServiceImpl service;

    private AutoCloseable closeable;

    @BeforeEach
    void init() {
        closeable = MockitoAnnotations.openMocks(this);
    }

    @Test
    void testSave() {
        AnnouncementDto dto = new AnnouncementDto();
        dto.setaDesc("New Announcement");
        dto.setaIsActive(true);

        Announcement entity = AnnouncementMapper.toEntity(dto);
        entity.setaId(1);
        entity.setaCreatedAt(LocalDateTime.now());

        when(repo.save(any(Announcement.class))).thenReturn(entity);

        AnnouncementDto savedDto = service.save(dto);

        assertNotNull(savedDto);
        assertEquals("New Announcement", savedDto.getaDesc());
        assertEquals(true, savedDto.getaIsActive());
        verify(repo, times(1)).save(any(Announcement.class));
    }

    @Test
    void testGetAll() {
        Announcement a1 = new Announcement();
        a1.setaId(1);
        a1.setaDesc("Test 1");
        a1.setaIsActive(true);

        Announcement a2 = new Announcement();
        a2.setaId(2);
        a2.setaDesc("Test 2");
        a2.setaIsActive(false);

        when(repo.findAll()).thenReturn(Arrays.asList(a1, a2));

        List<AnnouncementDto> result = service.getAll();

        assertEquals(2, result.size());
        assertEquals("Test 1", result.get(0).getaDesc());
        verify(repo, times(1)).findAll();
    }

    @Test
    void testGetById_Found() {
        Announcement a = new Announcement();
        a.setaId(1);
        a.setaDesc("Announcement");
        a.setaIsActive(true);

        when(repo.findById(1)).thenReturn(Optional.of(a));

        AnnouncementDto result = service.getById(1);

        assertNotNull(result);
        assertEquals("Announcement", result.getaDesc());
        verify(repo, times(1)).findById(1);
    }

    @Test
    void testGetById_NotFound() {
        when(repo.findById(99)).thenReturn(Optional.empty());

        AnnouncementDto result = service.getById(99);

        assertNull(result);
        verify(repo, times(1)).findById(99);
    }

    @Test
    void testUpdate_Found() {
        Announcement existing = new Announcement();
        existing.setaId(1);
        existing.setaDesc("Old Desc");
        existing.setaIsActive(false);

        AnnouncementDto updatedDto = new AnnouncementDto();
        updatedDto.setaDesc("Updated Desc");
        updatedDto.setaIsActive(true);

        when(repo.findById(1)).thenReturn(Optional.of(existing));
        when(repo.save(any(Announcement.class))).thenReturn(existing);

        AnnouncementDto result = service.update(1, updatedDto);

        assertNotNull(result);
        assertEquals("Updated Desc", result.getaDesc());
        assertTrue(result.getaIsActive());
        verify(repo, times(1)).findById(1);
        verify(repo, times(1)).save(existing);
    }

    @Test
    void testUpdate_NotFound() {
        AnnouncementDto dto = new AnnouncementDto();
        dto.setaDesc("Some Desc");
        dto.setaIsActive(true);

        when(repo.findById(123)).thenReturn(Optional.empty());

        AnnouncementDto result = service.update(123, dto);

        assertNull(result);
        verify(repo, times(1)).findById(123);
        verify(repo, never()).save(any());
    }

    @Test
    void testDelete() {
        doNothing().when(repo).deleteById(1);

        service.delete(1);

        verify(repo, times(1)).deleteById(1);
    }

    // failing test
    @Test
    void testGetById_WrongDescriptionFails() {
        Announcement a = new Announcement();
        a.setaId(1);
        a.setaDesc("Correct Description");
        a.setaIsActive(true);

        when(repo.findById(1)).thenReturn(Optional.of(a));

        AnnouncementDto result = service.getById(1);

        // Intentionally wrong assertion
        assertEquals("Wrong Description", result.getaDesc(), "This test is expected to fail");
    }

}
