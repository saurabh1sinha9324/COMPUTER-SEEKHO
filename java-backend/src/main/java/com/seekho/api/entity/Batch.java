package com.seekho.api.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "batch")
public class Batch {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "batch_id")
    private int batchId;

    @Column(name = "batch_name", unique = true)
    private String batchName;

    @Column(name = "batch_photo", unique = true, length = 500)
    private String batchPhoto;

    @Column(name = "batch_start_time")
    private LocalDate batchStartTime;

    @Column(name = "batch_end_time")
    private LocalDate batchEndTime;

    @ManyToOne
    @JoinColumn(name = "course_id", nullable = false)
    private Course course;

    @Column(name = "batch_is_active")
    private Boolean batchIsActive;

    @Column(name = "batch_placed_percent")
    private Double batchPlacedPercent;

    public Batch() {
    }

    public Batch(int batchId, String batchName, String batchPhoto, LocalDate batchStartTime, LocalDate batchEndTime,
                 Course course, Boolean batchIsActive, Double batchPlacedPercent) {
        this.batchId = batchId;
        this.batchName = batchName;
        this.batchPhoto = batchPhoto;
        this.batchStartTime = batchStartTime;
        this.batchEndTime = batchEndTime;
        this.course = course;
        this.batchIsActive = batchIsActive;
        this.batchPlacedPercent = batchPlacedPercent;
    }

    public int getBatchId() {
        return batchId;
    }

    public void setBatchId(int batch_id) {
        this.batchId = batch_id;
    }

    public String getBatchName() {
        return batchName;
    }

    public void setBatchName(String batchName) {
        this.batchName = batchName;
    }

    public LocalDate getBatchStartTime() {
        return batchStartTime;
    }

    public void setBatchStartTime(LocalDate batchStartTime) {
        this.batchStartTime = batchStartTime;
    }

    public LocalDate getBatchEndTime() {
        return batchEndTime;
    }

    public void setBatchEndTime(LocalDate batchEndTime) {
        this.batchEndTime = batchEndTime;
    }

    public int getCourseId() {
        return course.getCourseId();
    }

    public void setCourseId(int courseId) {
        this.course.setCourseId(courseId);
    }

    public Course getCourse() {
        return course;
    }

    public void setCourse(Course course) {
        this.course = course;
    }

    public Boolean getBatchIsActive() {
        return batchIsActive;
    }

    public void setBatchIsActive(Boolean batchIsActive) {
        this.batchIsActive = batchIsActive;
    }

    public String getBatchPhoto() {
        return batchPhoto;
    }

    public void setBatchPhoto(String batchPhoto) {
        this.batchPhoto = batchPhoto;
    }

    public Double getBatchPlacedPercent() {
        return batchPlacedPercent;
    }

    public void setBatchPlacedPercent(Double batchPlacedPercent) {
        this.batchPlacedPercent = batchPlacedPercent;
    }
}
