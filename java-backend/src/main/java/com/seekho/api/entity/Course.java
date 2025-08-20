package com.seekho.api.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "course")
public class Course {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "course_id")
	private int courseId;

	@Column(length = 100, name = "course_name")
	private String courseName;

	@Column(length = 500, name = "course_description")
	private String courseDescription;

	@Column(name = "course_duration")
	private int courseDuration;

	@Column(length = 200, name = "course_syllabus")
	private String courseSyllabus;

	@Column(length = 100, name = "age_grp_type")
	private String ageGrpType;

	@Column(name = "course_fee")
	private double courseFee;

	@Column(name = "course_is_active")
	private boolean courseIsActive = true;

	@Column(length = 100, name = "cover_photo")
	private String coverPhoto;


	public Course() {
	}


	public Course(int courseId, String courseName, String courseDescription, int courseDuration,
				  String courseSyllabus, String ageGrpType, double courseFee, boolean courseIsActive,
				  String coverPhoto) {
		this.courseId = courseId;
		this.courseName = courseName;
		this.courseDescription = courseDescription;
		this.courseDuration = courseDuration;
		this.courseSyllabus = courseSyllabus;
		this.ageGrpType = ageGrpType;
		this.courseFee = courseFee;
		this.courseIsActive = courseIsActive;
		this.coverPhoto = coverPhoto;
	}

	// Getters and setters
	public int getCourseId() {
		return courseId;
	}

	public void setCourseId(int courseId) {
		this.courseId = courseId;
	}

	public String getCourseName() {
		return courseName;
	}

	public void setCourseName(String courseName) {
		this.courseName = courseName;
	}

	public String getCourseDescription() {
		return courseDescription;
	}

	public void setCourseDescription(String courseDescription) {
		this.courseDescription = courseDescription;
	}

	public int getCourseDuration() {
		return courseDuration;
	}

	public void setCourseDuration(int courseDuration) {
		this.courseDuration = courseDuration;
	}

	public String getCourseSyllabus() {
		return courseSyllabus;
	}

	public void setCourseSyllabus(String courseSyllabus) {
		this.courseSyllabus = courseSyllabus;
	}

	public String getAgeGrpType() {
		return ageGrpType;
	}

	public void setAgeGrpType(String ageGrpType) {
		this.ageGrpType = ageGrpType;
	}

	public double getCourseFee() {
		return courseFee;
	}

	public void setCourseFee(double courseFee) {
		this.courseFee = courseFee;
	}

	public boolean getCourseIsActive() {
		return courseIsActive;
	}

	public void setCourseIsActive(boolean courseIsActive) {
		this.courseIsActive = courseIsActive;
	}

	public String getCoverPhoto() {
		return coverPhoto;
	}

	public void setCoverPhoto(String coverPhoto) {
		this.coverPhoto = coverPhoto;
	}
}
