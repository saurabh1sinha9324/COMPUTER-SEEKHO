package com.seekho.api.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;



@Entity
@Table(name = "recruiter")
public class Recruiter {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "recruiter_id")
    private int recruiterId;

    @Column(name = "recruiter_name")
    private String recruiterName;

    @Column(name = "recruiter_location")
    @Size(min = 3, max = 50)
    private String recruiterLocation;

    @Column(name = "recruiter_photo")
    private String recruiterPhoto;

    public Recruiter(){}
    public Recruiter(int recruiterId, String recruiterName, String recruiterLocation, String recruiterPhoto) {
        this.recruiterId = recruiterId;
        this.recruiterName = recruiterName;
        this.recruiterLocation = recruiterLocation;
        this.recruiterPhoto = recruiterPhoto;
    }

    public int getRecruiterId() {
        return recruiterId;
    }

    public void setRecruiterId(int recruiterId) {
        this.recruiterId = recruiterId;
    }

    public String getRecruiterName() {
        return recruiterName;
    }

    public void setRecruiterName(String recruiterName) {
        this.recruiterName = recruiterName;
    }

    public String getRecruiterLocation() {
        return recruiterLocation;
    }

    public void setRecruiterLocation(String recruiterLocation) {
        this.recruiterLocation = recruiterLocation;
    }

    public String getRecruiterPhoto() {
        return recruiterPhoto;
    }

    public void setRecruiterPhoto(String recruiterPhoto) {
        this.recruiterPhoto = recruiterPhoto;
    }
}
