-- WelZoneApp schema fix + seed data
-- Matches the exact column names used by the repository layer.

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS blog_readings;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS blog_posts;
DROP TABLE IF EXISTS qualifications;
DROP TABLE IF EXISTS course_log;
DROP TABLE IF EXISTS feedback_log;
DROP TABLE IF EXISTS feedback;
DROP TABLE IF EXISTS course_enrollments;
DROP TABLE IF EXISTS courses;
DROP TABLE IF EXISTS chat_messages;
DROP TABLE IF EXISTS session_logs;
DROP TABLE IF EXISTS daily_mood_log;
DROP TABLE IF EXISTS user_mood;
DROP TABLE IF EXISTS moods;
DROP TABLE IF EXISTS slots;
DROP TABLE IF EXISTS slot;
DROP TABLE IF EXISTS counselors;
DROP TABLE IF EXISTS users;

-- ============ users ============
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone_number VARCHAR(30),
    date_of_birth DATETIME,
    gender VARCHAR(20),
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============ counselors ============
CREATE TABLE counselors (
    counselor_id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    phone VARCHAR(30),
    date_of_birth DATETIME,
    specialization VARCHAR(255),
    qualification VARCHAR(255),
    experience INT,
    rating DOUBLE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============ courses ============
CREATE TABLE courses (
    courseId BIGINT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    price DOUBLE,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============ course_enrollments ============
CREATE TABLE course_enrollments (
    userId BIGINT NOT NULL,
    courseId BIGINT NOT NULL,
    enrollmentDate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'ACTIVE',
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (userId, courseId)
);

-- ============ qualifications ============
CREATE TABLE qualifications (
    qualificationId BIGINT AUTO_INCREMENT PRIMARY KEY,
    counselorId BIGINT NOT NULL,
    qualification VARCHAR(255) NOT NULL
);

-- ============ blog_posts ============
CREATE TABLE blog_posts (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    counselor_id BIGINT NOT NULL,
    title VARCHAR(255) NOT NULL,
    content LONGTEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============ comments ============
CREATE TABLE comments (
    commentId BIGINT AUTO_INCREMENT PRIMARY KEY,
    feedbackId BIGINT NOT NULL,
    comment TEXT NOT NULL
);

-- ============ blog_readings ============
CREATE TABLE blog_readings (
    blogId BIGINT NOT NULL,
    userId BIGINT NOT NULL,
    time BIGINT NOT NULL,
    PRIMARY KEY (blogId, userId)
);

-- ============ moods ============
CREATE TABLE moods (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    mood_type VARCHAR(100) NOT NULL UNIQUE
);

-- ============ user_mood ============
CREATE TABLE user_mood (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    mood_id BIGINT NOT NULL,
    mood_set_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============ daily_mood_log ============
CREATE TABLE daily_mood_log (
    mood_id BIGINT NOT NULL,
    auditId BIGINT NOT NULL,
    PRIMARY KEY (mood_id, auditId)
);

-- ============ chat_messages ============
CREATE TABLE chat_messages (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    session_id BIGINT NOT NULL,
    sender_id BIGINT NOT NULL,
    sender_type VARCHAR(20) NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ============ slots (plural, as used by SlotRepository) ============
CREATE TABLE slots (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    counselor_id BIGINT NOT NULL,
    user_id BIGINT,
    start_time DATETIME NOT NULL,
    end_time DATETIME NOT NULL,
    booked TINYINT(1) NOT NULL DEFAULT 0
);

-- ============ course_log ============
CREATE TABLE course_log (
    auditId BIGINT NOT NULL,
    courseId BIGINT NOT NULL,
    PRIMARY KEY (auditId, courseId)
);

-- ============ feedback ============
CREATE TABLE feedback (
    feedbackId BIGINT AUTO_INCREMENT PRIMARY KEY,
    sessionId BIGINT NOT NULL,
    rating INT NOT NULL,
    comments TEXT,
    createdAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- ============ feedback_log ============
CREATE TABLE feedback_log (
    auditId BIGINT NOT NULL,
    feedbackId BIGINT NOT NULL,
    PRIMARY KEY (auditId, feedbackId)
);

-- ============ session_logs ============
CREATE TABLE session_logs (
    logId BIGINT AUTO_INCREMENT PRIMARY KEY,
    sessionId BIGINT NOT NULL,
    log_time DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    log_details TEXT
);

-- ============ audit_logs ============
CREATE TABLE audit_logs (
    auditId BIGINT AUTO_INCREMENT PRIMARY KEY,
    userId BIGINT,
    counselorId BIGINT,
    action VARCHAR(255) NOT NULL,
    details TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

SET FOREIGN_KEY_CHECKS = 1;