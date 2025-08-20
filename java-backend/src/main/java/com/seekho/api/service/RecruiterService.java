package com.seekho.api.service;



import com.seekho.api.entity.Recruiter;

import java.util.List;
import java.util.Optional;

public interface RecruiterService {
    Recruiter addRecruiter(Recruiter recruiter);
    boolean updateRecruiter(Recruiter recruiter);
    void deleteRecruiter(int recruiterId);
    Optional<Recruiter> getRecruiterById(int recruiterId);
    List<Recruiter> getAllRecruiters();
}
