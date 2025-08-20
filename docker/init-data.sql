INSERT INTO course (
    course_id, course_description, course_duration, course_fee, 
    course_is_active, course_name, course_syllabus, cover_photo, age_grp_type
) VALUES
(1, 'ADVANCE COMPUTING COURSE', 6, 160000, 1, 'PGDAC', 'c++ dsa dbms os java javaadv wpt', 'courses/dac.png', '21'),
(2, 'ADVANCE DATA ANALYTICS COURSE', 6, 125000, 1, 'PGDBDA', 'aws python java', 'courses/dbda.png', '20'),
(3, 'BASIC COMPUTERS', 3, 25000, 1, 'MSCIT', 'ms office', 'courses/mscit.png', NULL),
(4, 'COURSE', 1, 10000, 1, 'FUNDAMENTAL Siddhesh', 'aws', 'https://mscit.mkcl.org/user/pages/01.home/_slider/MS-CIT%20Web%20Banner%202025-min_7.jpg', '5');


INSERT INTO course (
    course_id, course_description, course_duration, course_fee,
    course_is_active, course_name, course_syllabus, cover_photo, age_grp_type
) VALUES
(5, 'ADVANCE COMPUTING COURSE', 6, 160000, 1, 'PGDAC', 'c++ dsa dbms os java javaadv wpt', 'courses/dac.png', '21'),
(6, 'ADVANCE DATA ANALYTICS COURSE', 6, 125000, 1, 'PGDBDA', 'aws python java', 'courses/dbda.png', '20'),
(7, 'BASIC COMPUTERS', 3, 25000, 1, 'MSCIT', 'ms office', 'courses/mscit.png', NULL),
(8, 'COURSE', 1, 10000, 1, 'FUNDAMENTAL Siddhesh', 'aws', 'https://mscit.mkcl.org/user/pages/01.home/_slider/MS-CIT%20Web%20Banner%202025-min_7.jpg', '5');

INSERT INTO batch (
    batch_id, batch_end_time, batch_is_active, batch_name,
    batch_photo, batch_start_time, course_id, batch_placed_percent
) VALUES
(55, '2025-06-30', 1, 'PG DAC March 2024', '/public/batchwisePlacement/dac_March24.jpg', '2025-01-01', 1, 79),
(56, '2025-06-30', 1, 'PG DAC Sept 2023', '/public/batchwisePlacement/dac_Sept23.jpg', '2025-01-01', 1, 70),
(57, '2025-06-30', 1, 'PG DAC March 2023', '/public/batchwisePlacement/dac_march23.png', '2025-01-01', 1, 67),
(58, '2025-06-30', 1, 'PG DAC Sept 2022', '/public/batchwisePlacement/dac_sept22.png', '2025-01-01', 1, 70),
(59, '2025-06-30', 1, 'DAC March 2022', '/public/batchwisePlacement/DAC_march22.png', '2025-01-01', 1, 90),
(60, '2025-06-30', 1, 'e-DAC Sept 2021', '/public/batchwisePlacement/dac_sept21.png', '2025-01-01', 1, 100),
(61, '2025-06-30', 1, 'e-DAC May 2021', '/public/batchwisePlacement/DAC_may21.png', '2025-01-01', 1, 100),
(62, '2025-06-30', 1, 'e-DAC Sep 2020', '/public/batchwisePlacement/DAC_sep20.png', '2025-01-01', 1, 100),
(63, '2025-06-30', 1, 'PG-DAC Feb 2020', '/public/batchwisePlacement/DAC_feb20.png', '2025-01-01', 1, 100),
(64, '2025-06-30', 1, 'PG-DAC Aug 2019', '/public/batchwisePlacement/dac_aug19.png', '2025-01-01', 1, 90),
(65, '2025-06-30', 1, 'PG-DAC Feb 2019', '/public/batchwisePlacement/feb19.png', '2025-01-01', 1, 100),
(66, '2025-06-30', 1, 'PG-DAC Aug 2018', '/public/batchwisePlacement/aug18.png', '2025-01-01', 1, 100),
(67, '2025-06-30', 1, 'PG-DAC Feb 2018', '/public/batchwisePlacement/feb18.png', '2025-01-01', 1, 100),
(68, '2025-06-30', 1, 'PG-DAC Aug 2017', '/public/batchwisePlacement/aug17.png', '2025-01-01', 1, 98),
(69, '2025-06-30', 1, 'PG-DAC Feb 2017', '/public/batchwisePlacement/feb17.png', '2025-01-01', 1, 97),
(70, '2025-06-30', 1, 'PG-DAC Aug 2016', '/public/batchwisePlacement/aug16.png', '2025-01-01', 1, 100),
(71, '2025-06-30', 1, 'PG-DAC Feb 2016', '/public/batchwisePlacement/feb16.png', '2025-01-01', 1, 97),
(72, '2025-06-30', 1, 'PG-DAC Aug 2015', '/public/batchwisePlacement/aug15.png', '2025-01-01', 1, 100),
(73, '2025-06-30', 1, 'PG-DAC Feb 2015', '/public/batchwisePlacement/feb15.png', '2025-01-01', 1, 100),
(74, '2025-08-06', 1, 'PG-DAC Feb 2045 pradeep', 'NA', '2025-08-04', 4, 100);


INSERT INTO recruiter (
    recruiter_id, recruiter_location, recruiter_name, recruiter_photo
) VALUES
(1, 'Mumbai', '3i', '/public/recruiters/3i.png'),
(2, 'Mumbai', '63moons', '/public/recruiters/63moons.png'),
(3, 'Mumbai', 'Altair', '/public/recruiters/altair.png'),
(4, 'Mumbai', 'Amdocs', '/public/recruiters/amdocs.png'),
(5, 'Mumbai', 'Atos', '/public/recruiters/atos.png'),
(6, 'Mumbai', 'Atos Consulting', '/public/recruiters/atosconsulting.png'),
(7, 'Mumbai', 'AurionPro', '/public/recruiters/aurionpro.png'),
(8, 'Mumbai', 'AutomationEdge', '/public/recruiters/automationEdge.png'),
(9, 'Mumbai', 'BNP', '/public/recruiters/bnp.png'),
(10, 'Mumbai', 'C2LBiz', '/public/recruiters/c2lbiz.png'),
(11, 'Mumbai', 'Capgemini', '/public/recruiters/capgemini.png'),
(12, 'Mumbai', 'Carewale', '/public/recruiters/carewale.png'),
(13, 'Mumbai', 'CCAvenue', '/public/recruiters/ccavenue.png'),
(14, 'Mumbai', 'Concerto', '/public/recruiters/concerto.png'),
(15, 'Mumbai', 'Cybage', '/public/recruiters/cybage.png'),
(16, 'Mumbai', 'DePronto', '/public/recruiters/depronto.png'),
(17, 'Mumbai', 'Diebold', '/public/recruiters/diebold.png'),
(18, 'Mumbai', 'FinancialTech', '/public/recruiters/financialtech.png'),
(19, 'Mumbai', 'GreenPoint', '/public/recruiters/greenpoint.png'),
(20, 'Mumbai', 'HOC', '/public/recruiters/hoc.png'),
(21, 'Mumbai', 'HopScotch', '/public/recruiters/hopscotch.png'),
(22, 'Mumbai', 'IKS', '/public/recruiters/iks.png'),
(23, 'Mumbai', 'Infintus', '/public/recruiters/infintus.png'),
(24, 'Mumbai', 'Infrasoft', '/public/recruiters/infrasoft.png'),
(25, 'Mumbai', 'Intellect', '/public/recruiters/intellect.png'),
(26, 'Mumbai', 'Jio', '/public/recruiters/jio.png'),
(27, 'Mumbai', 'Kinai', '/public/recruiters/kinai.png'),
(28, 'Mumbai', 'Larsen & Toubro', '/public/recruiters/LarsenTurbo.png'),
(29, 'Mumbai', 'LearningMate', '/public/recruiters/learningmate.png'),
(30, 'Mumbai', 'Logixal', '/public/recruiters/logixal.png'),
(31, 'Mumbai', 'Mindstix', '/public/recruiters/mindstix.png'),
(32, 'Mumbai', 'MobileM', '/public/recruiters/mobilem.png'),
(33, 'Mumbai', 'Mobitrail', '/public/recruiters/mobitrail.png'),
(34, 'Mumbai', 'Morningstar', '/public/recruiters/morningstar.png'),
(35, 'Mumbai', 'NeoSoft', '/public/recruiters/neosoft.png'),
(36, 'Mumbai', 'NPCI', '/public/recruiters/npci.png'),
(37, 'Mumbai', 'NSE', '/public/recruiters/nse.png'),
(38, 'Mumbai', 'ObjectEdge', '/public/recruiters/objectedge.png'),
(39, 'Mumbai', 'OnMobile', '/public/recruiters/onmobile.png'),
(40, 'Mumbai', 'Prorigo', '/public/recruiters/prorigo.png'),
(41, 'Mumbai', 'Quantifi', '/public/recruiters/quantifi.png'),
(42, 'Mumbai', 'Raja Labs', '/public/recruiters/rajalabs.png'),
(43, 'Mumbai', 'Rolta', '/public/recruiters/rolta.png'),
(44, 'Mumbai', 'Saint Gobain', '/public/recruiters/saintgobain.png'),
(45, 'Mumbai', 'Sapiens', '/public/recruiters/sapiens.png'),
(46, 'Mumbai', 'Simeio', '/public/recruiters/simeio.png'),
(47, 'Mumbai', 'SmartStream', '/public/recruiters/smartstream.png'),
(48, 'Mumbai', 'Tata', '/public/recruiters/tata.png'),
(49, 'Mumbai', 'Tavisca', '/public/recruiters/tavisca.png'),
(50, 'Mumbai', 'Vara', '/public/recruiters/vara.png');


INSERT INTO placement (
    placement_id, batch_id, recruiter_id, student_id, student_name, student_photo
) VALUES
(1, 55, 11, 1, 'AAKANKSHA KHAIRNAR', '/public/students/dac_March24/AAKANKSHA KHAIRNAR_SMVITA.jpg'),
(2, 55, 5, 2, 'ABHISHEK KARMORE', '/public/students/dac_March24/ABHISHEK KARMORE_SMVITA.jpg'),
(3, 55, 4, 3, 'ABHISHEK SHELKE', '/public/students/dac_March24/ABHISHEK SHELKE_SMVITA.jpg'),
(4, 55, 26, 4, 'AJINKYA MALI', '/public/students/dac_March24/AJINKYA MALI_SMVITA.jpg'),
(5, 55, 48, 5, 'AKSHAY GHANEKAR', '/public/students/dac_March24/AKSHAY GHANEKAR_SMVITA.jpg'),
(6, 55, 15, 6, 'AKSHAYKUMAR FAGARE', '/public/students/dac_March24/AKSHAYKUMAR FAGARE_SMVITA.jpg'),
(7, 55, 32, 7, 'ANKLESH BHUTE', '/public/students/dac_March24/ANKLESH BHUTE_SMVITA.jpg'),
(8, 55, 19, 8, 'ASHITOSH KUDTARKAR', '/public/students/dac_March24/ASHITOSH KUDTARKAR_SMVITA.jpg'),
(9, 55, 12, 9, 'ASHUTOSH TRIPATHI', '/public/students/dac_March24/ASHUTOSH TRIPATHI_SMVITA.jpg'),
(10, 55, 33, 10, 'AVADHUT GHADGE', '/public/students/dac_March24/AVADHUT GHADGE_SMVITA.jpg'),
(11, 55, 14, 11, 'CHAITANYA RASKAR', '/public/students/dac_March24/CHAITANYA RASKAR_SMVITA.jpg'),
(12, 55, 7, 12, 'CHIRAG YADAV', '/public/students/dac_March24/CHIRAG YADAV_SMVITA.jpg'),
(13, 55, 25, 13, 'DARSHAN SAMBAR', '/public/students/dac_March24/DARSHAN SAMBAR_SMVITA.jpg'),
(14, 55, 41, 14, 'DURGESH GAIKWAD', '/public/students/dac_March24/DURGESH GAIKWAD_SMVITA.jpg'),
(15, 55, 2, 15, 'GANESH WAGH', '/public/students/dac_March24/GANESH WAGH_SMVITA.jpg'),
(16, 55, 10, 16, 'GAURAV SHARMA', '/public/students/dac_March24/GAURAV SHARMA_SMVITA.jpg'),
(17, 56, 3, 17, 'ABHIJIT MAHALE', '/public/students/dac_Sept23/ABHIJIT MAHALE_SMVITA.jpg'),
(18, 56, 6, 18, 'ABHISHEK MAHANAG', '/public/students/dac_Sept23/ABHISHEK MAHANAG_SMVITA.jpg'),
(19, 56, 13, 19, 'ABHISHEK RAJESHIRKE', '/public/students/dac_Sept23/ABHISHEK RAJESHIRKE_SMVITA.jpg'),
(20, 56, 8, 20, 'ABHISHEK WAGH', '/public/students/dac_Sept23/ABHISHEK WAGH_SMVITA.jpg'),
(21, 56, 28, 21, 'ADITYA JAVALIKAR', '/public/students/dac_Sept23/ADITYA JAVALIKAR_SMVITA.jpg'),
(22, 56, 47, 22, 'ADITYA SINGH', '/public/students/dac_Sept23/ADITYA SINGH_SMVITA.jpg'),
(23, 56, 30, 23, 'AEKANSH SINGH', '/public/students/dac_Sept23/AEKANSH SINGH_SMVITA.jpg'),
(24, 56, 20, 24, 'AKASH SANGLE', '/public/students/dac_Sept23/AKASH SANGLE_SMVITA.jpg'),
(25, 56, 9, 25, 'AKSHAY SHINDE', '/public/students/dac_Sept23/AKSHAY SHINDE_SMVITA.jpg'),
(26, 56, 34, 26, 'AMARNATH DHARMURE', '/public/students/dac_Sept23/AMARNATH DHARMURE_SMVITA.jpg'),
(27, 56, 22, 27, 'ANIKET BORSE', '/public/students/dac_Sept23/ANIKET BORSE_SMVITA.jpg'),
(28, 56, 36, 28, 'ANKIT YADAV', '/public/students/dac_Sept23/ANKIT YADAV_SMVITA.jpg'),
(29, 56, 39, 29, 'AVDHUT PATIL', '/public/students/dac_Sept23/AVDHUT PATIL_SMVITA.jpg'),
(30, 56, 29, 30, 'BHUSHAN GAYKAWAD', '/public/students/dac_Sept23/BHUSHAN GAYKAWAD_SMVITA.jpg'),
(31, 56, 23, 31, 'DEVASHEESH DUBEY', '/public/students/dac_Sept23/DEVASHEESH DUBEY_SMVITA.jpg'),
(32, 56, 42, 32, 'DEVYANI WASADE', '/public/students/dac_Sept23/DEVYANI WASADE_SMVITA.jpg'),
(33, 57, 35, 33, 'ABHISHEK SURVE', '/public/students/dac_march23/ABHISHEK SURVE_SMVITA.jpg'),
(34, 57, 31, 34, 'ADITI SHUKLA', '/public/students/dac_march23/ADITI SHUKLA_SMVITA.jpg'),
(35, 57, 38, 35, 'ADITYA PAL', '/public/students/dac_march23/ADITYA PAL_SMVITA.jpg'),
(36, 57, 16, 36, 'AJAYKUMAR YADAV', '/public/students/dac_march23/AJAYKUMAR YADAV_SMVITA.jpg'),
(37, 57, 18, 37, 'AKASH KATHE', '/public/students/dac_march23/AKASH KATHE_SMVITA.jpg'),
(38, 57, 24, 38, 'AKASHSINGH DIGWA', '/public/students/dac_march23/AKASHSINGH DIGWA_SMVITA.jpg'),
(39, 57, 1, 39, 'AKHILESH NERURKAR', '/public/students/dac_march23/AKHILESH NERURKAR_SMVITA.jpg'),
(40, 57, 46, 40, 'AKSHAY DAHAKE', '/public/students/dac_march23/AKSHAY DAHAKE_SMVITA.jpg'),
(41, 57, 44, 41, 'AMRESH SHARMA', '/public/students/dac_march23/AMRESH SHARMA_SMVITA.jpg'),
(42, 57, 40, 42, 'ASAWARI BARDE', '/public/students/dac_march23/ASAWARI BARDE_SMVITA.jpg'),
(43, 57, 21, 43, 'ATHARVA KENY', '/public/students/dac_march23/ATHARVA KENY_SMVITA.jpg'),
(44, 57, 45, 44, 'CHAITALEE GHURDE', '/public/students/dac_march23/CHAITALEE GHURDE_SMVITA.jpg'),
(45, 57, 43, 45, 'CHAITANYA BARAI', '/public/students/dac_march23/CHAITANYA BARAI_SMVITA.jpg'),
(46, 57, 27, 46, 'GANESH PRABHU', '/public/students/dac_march23/GANESH PRABHU_SMVITA.jpg'),
(47, 57, 37, 47, 'HARSHAL AHIRE', '/public/students/dac_march23/HARSHAL AHIRE_SMVITA.jpg'),
(48, 57, 50, 48, 'HRISHIKESH KHETALE', '/public/students/dac_march23/HRISHIKESH KHETALE_SMVITA.jpg'),
(54, 74, 8, 0, 'siddhesh', 'https://mscit.mkcl.org/user/pages/01.home/_slider/MS-CIT%20Web%20Banner%202025-min_8.jpg'),
(63, 74, 13, 1009, 'mihir', 'https://mscit.mkcl.org/user/pages/01.home/_slider/MS-CIT%20Web%20Banner%202025-min_1.jpg');


-- POST: http://localhost:8080/api/staff
-- {
--   "staffName": "Abhishek Karmore",
--   "photoUrl": "/students/dac_March24/ABHISHEK KARMORE_SMVITA.jpg",
--   "staffMobile": "9876543210",
--   "staffEmail": "abhishek.karmore@example.com",
--   "staffUsername": "abhishek.karmore@example.com",
--   "staffPassword": "passKarmore123",
--   "staffRole": "Teaching Staff"
-- }
-- POST: http://localhost:8080/api/staff
-- {
--   "staffName": "Abhishek Shelke",
--   "photoUrl": "/students/dac_March24/ABHISHEK SHELKE_SMVITA.jpg",
--   "staffMobile": "9123456780",
--   "staffEmail": "abhishek.shelke@example.com",
--   "staffUsername": "abhishek.shelke@example.com",
--   "staffPassword": "passShelke123",
--   "staffRole": "Non Teaching"
-- }

INSERT INTO closure_reason (
    closure_reason_id, closure_reason_desc, enquirer_name
) VALUES
(1, 'Found a better option', 'Rahul More');


INSERT INTO enquiry (
    enquiry_id, course_name, enquirer_address, enquirer_email_id,
    enquirer_mobile, enquirer_name, enquirer_query, enquiry_counter,
    enquiry_date, enquiry_is_active, follow_up_date, student_name, staff_id
) VALUES
(2, 'DBDA', 'Mumbai', 'priya.deshmukh@example.com', '9123456780',
 'Priya Deshmukh', 'F3 DBDA course', 3, '2025-08-05', 1, '2025-08-08', 'Priya Deshmukh', NULL),
(7, 'PGDBDA', 'Pune', 'sneha.kulkarni@example.com', '9123456783',
 'Sneha Kulkarni', 'F1:Pg DBDA Enquiry', 1, '2025-08-05', 1, '2025-08-08', 'Sneha Kulkarni', 2),
(8, 'MSCIT', 'Delhi', 'sumit.sharma@example.com', '9988776644',
 'Sumit Sharma', 'Mscit Enquiry', 1, '2025-08-04', 1, '2025-08-07', 'Sumit Sharma', 1),
(9, 'PGDAC', 'Nanded', 'riya.deshmukh@example.com', '8123456780',
 'Riya Deshmukh', 'DAC Enquiry 2', 2, '2025-08-07', 1, '2025-08-10', 'Riya Deshmukh', 1);

INSERT INTO student (
    student_id, payment_due, photo_url, student_dob,
    student_gender, student_qualification, batch_id, course_id, enquiry_id
) VALUES
(1, 0, '/public/students/dac_Sept23/ABHIJIT MAHALE_SMVITA.jpg',
 '2025-08-05', 'female', 'B.E. Elx', 74, 2, 2);





-- ----------------------------------------------------------------
-- 			Campus Life   --- Pradeep Shinde
-- -----------------------------------------------------------------
INSERT INTO campus_life (id, title, description, image_url) VALUES
(17, 'Campus', 'Institute campus', '/campusLife/1.jpg'),
(18, 'Beach Activity', 'First Day Activity', '/campusLife/3.jpeg'),
(19, 'Beach Activity', 'first day', '/campusLife/2.jpeg'),
(20, 'Beach Activity', 'first day', '/campusLife/4.jpeg'),
(21, 'Convocation Ceremony', 'Aug-2025 Batch', '/campusLife/5.jpeg'),
(22, 'Traditional Day', 'Group photo during birthday celebration', '/campusLife/6.jpeg'),
(23, 'Fruit Distribution', 'Groupwise fruit distribution', '/campusLife/7.jpeg'),
(24, 'Salad Party', 'A party was given by the institute to celebrate the students\' hard work in Course', '/campusLife/8.jpeg');


-- ----------------------------------------------------------------
-- 			Annououncements   --- Pradeep Shinde
-- -----------------------------------------------------------------

INSERT INTO announcements (a_Id,  a_desc, a_Created_At, a_Is_Active) VALUES 
(1, 'Welcome', '2025-08-06 18:37:20', TRUE), 
(11, '🎓 New Batch Alert: Admissions are now open for the PG-DAC course starting 15th August 2025. Limited seats available—Enroll Now!', '2025-08-06 19:14:50', TRUE);



-- -----------------------------------------------------------
-- 			faculty-->table                   kushal
--  ----------------------------------------------------------- 
INSERT INTO faculty (id, active, email, name, photo_url, subject)
VALUES
(10, 1, 'smvita@gmail.com',  'Nitin vijaykar',   'public\\faculty\\nitin.jpg',    'C++, Core and Enterprise Java'),
(11, 1, 'smvita1@gmail.com', 'Ketki Acharya',    'public\\faculty\\ketki.jpg',    'C, Web Programming, .Net'),
(12, 1, 'smvita2@gmail.com', 'Jayant Ponkshe',   'public\\faculty\\jayant.jpg',   'Project Mentor'),
(13, 1, 'smvita3@gmail.com', 'Vikram Nayak',     'public\\faculty\\vikram.jpg',   'Soft Skills'),
(14, 1, 'smvita4@gmail.com', 'Amar Panchal',     'public\\faculty\\Amar P.jpg',   'Data Structures & Algorithms'),
(15, 1, 'smvita5@gmail.com', 'Pradeep Tripathi', 'public\\faculty\\pradeep1.jpg', 'Big Data, AI and ML');

