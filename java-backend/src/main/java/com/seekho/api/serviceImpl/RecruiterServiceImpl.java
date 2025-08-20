package com.seekho.api.serviceImpl;


import com.seekho.api.entity.Recruiter;
import com.seekho.api.repository.RecruiterRepo;
import com.seekho.api.service.RecruiterService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RecruiterServiceImpl implements RecruiterService {

    @Autowired
    private RecruiterRepo recruiterRepo;

    @Override
    public Recruiter addRecruiter(Recruiter recruiter) {
        return recruiterRepo.save(recruiter);
    }

    @Override
    public boolean updateRecruiter(Recruiter recruiter) {
        Optional<Recruiter> foundRecruiter = recruiterRepo.findById(recruiter.getRecruiterId());
        if(foundRecruiter.isPresent()) {
            recruiterRepo.save(recruiter);
            return true;
        }
        else return false;
    }

    @Override
    public void deleteRecruiter(int recruiterId) {
        recruiterRepo.deleteById(recruiterId);
    }

    @Override
    public Optional<Recruiter> getRecruiterById(int recruiterId) {
        return recruiterRepo.findById(recruiterId);
    }

    @Override
    public List<Recruiter> getAllRecruiters() {
        return recruiterRepo.findAll();
    }
    
}
