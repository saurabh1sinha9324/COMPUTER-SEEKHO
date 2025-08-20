package com.seekho.api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "placement")
public class Placement {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "placement_id")
    private int placementID;

    @Column(name = "student_id")
    private int studentId;

    @Column(name = "student_name")
    private String studentName;

    @Column(name = "student_photo", length = 500)
    private String studentPhoto;

    @ManyToOne
    @JoinColumn(name = "recruiter_id", referencedColumnName = "recruiter_id")
    private Recruiter recruiterID;

    @ManyToOne
    @JoinColumn(name = "batch_id", referencedColumnName = "batch_id")
    private Batch batch;

    public Placement() {}

    public Placement(int placementID, int studentId, String studentName, String studentPhoto, Recruiter recruiterID, Batch batch) {
        this.placementID = placementID;
        this.studentId = studentId;
        this.studentName = studentName;
        this.studentPhoto = studentPhoto;
        this.recruiterID = recruiterID;
        this.batch = batch;
    }

    public int getPlacementID() {
        return placementID;
    }

    public void setPlacementID(int placementID) {
        this.placementID = placementID;
    }

    public int getStudentId() {
        return studentId;
    }

    public void setStudentId(int studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getStudentPhoto() {
        return studentPhoto;
    }

    public void setStudentPhoto(String studentPhoto) {
        this.studentPhoto = studentPhoto;
    }

    public Recruiter getRecruiter() {
        return recruiterID;
    }

    public void setRecruiter(Recruiter recruiterID) {
        this.recruiterID = recruiterID;
    }

    public Batch getBatch() {
        return batch;
    }

    public void setBatch(Batch batch) {
        this.batch = batch;
    }
}
