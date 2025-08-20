package com.seekho.api.entity;

import jakarta.persistence.*;

import java.util.List;

@Entity
@Table(name = "staff")
public class Staff {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "staff_id")
    private Long staffId;

    @Column(name = "staff_name")
    private String staffName;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(name = "staff_mobile")
    private String staffMobile;

    @Column(name = "staff_email")
    private String staffEmail;

    @Column(name = "staff_username")
    private String staffUsername;

    @Column(name = "staff_password")
    private String staffPassword;

    @Column(name = "staff_role")
    private String staffRole;

    // Optional: Bidirectional mapping
    // @OneToMany(mappedBy = "staff")
    // @JsonIgnore
    // private List<Enquiry> enquiries;



    public Staff(){}
    public Staff(Long staffId, String staffName, String photoUrl, String staffMobile, String staffEmail, String staffUsername, String staffPassword, String staffRole) {
        this.staffId = staffId;
        this.staffName = staffName;
        this.photoUrl = photoUrl;
        this.staffMobile = staffMobile;
        this.staffEmail = staffEmail;
        this.staffUsername = staffUsername;
        this.staffPassword = staffPassword;
        this.staffRole = staffRole;
    }

    // Getters and setters
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

    public String getStaffUsername() {
        return staffUsername;
    }

    public void setStaffUsername(String staffUsername) {
        this.staffUsername = staffUsername;
    }

    public String getStaffPassword() {
        return staffPassword;
    }

    public void setStaffPassword(String staffPassword) {
        this.staffPassword = staffPassword;
    }

    public String getStaffRole() {
        return staffRole;
    }

    public void setStaffRole(String staffRole) {
        this.staffRole = staffRole;
    }
}
