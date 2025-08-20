package com.seekho.api.dto;

import java.util.UUID;

public class StaffResponseDto {
    private Long staffId;
    private String staffName;
    private String photoUrl;
    private String staffMobile;
    private String staffEmail;
    private String staffRole;
    private String token = UUID.randomUUID().toString();
//private String token;

    public void setToken(String token) {
        this.token = token;
    }


    public String getToken() {
        return token;
    }

    public StaffResponseDto(){}
    public StaffResponseDto(Long staffId, String staffName, String photoUrl, String staffMobile, String staffEmail, String staffRole) {
        this.staffId = staffId;
        this.staffName = staffName;
        this.photoUrl = photoUrl;
        this.staffMobile = staffMobile;
        this.staffEmail = staffEmail;
        this.staffRole = staffRole;
    }

    public Long getStaffId() {
        return staffId;
    }

    public void setStaffId(Long staffId) {
        this.staffId = staffId;
    }

    public String getStaffName() {
        return staffName;
    }

    public void setStaffName(String staffName) {
        this.staffName = staffName;
    }

    public String getPhotoUrl() {
        return photoUrl;
    }

    public void setPhotoUrl(String photoUrl) {
        this.photoUrl = photoUrl;
    }

    public String getStaffMobile() {
        return staffMobile;
    }

    public void setStaffMobile(String staffMobile) {
        this.staffMobile = staffMobile;
    }

    public String getStaffEmail() {
        return staffEmail;
    }

    public void setStaffEmail(String staffEmail) {
        this.staffEmail = staffEmail;
    }

    public String getStaffRole() {
        return staffRole;
    }

    public void setStaffRole(String staffRole) {
        this.staffRole = staffRole;
    }
}
