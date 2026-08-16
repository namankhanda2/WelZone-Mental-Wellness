-- WelZoneApp dummy/seed data
-- All users & counselors use password: Password@123

SET FOREIGN_KEY_CHECKS = 0;

-- ============ users ============
INSERT INTO users (id, username, password, email, phone_number, date_of_birth, gender) VALUES
(1, 'naman987', '$2y$12$4C4v/ZrjLIVZ6gEbOTjgquOVAm/w7gAyeDjuQbtZQJEEZ32KdhWWi', 'namankhanda20@gmail.com', '8769674686', '2004-09-13 00:00:00', 'Male'),
(2, 'riya_sharma', '$2y$12$4C4v/ZrjLIVZ6gEbOTjgquOVAm/w7gAyeDjuQbtZQJEEZ32KdhWWi', 'riya.sharma@gmail.com', '9876543210', '1999-05-22 00:00:00', 'Female'),
(3, 'arjun_mehta', '$2y$12$4C4v/ZrjLIVZ6gEbOTjgquOVAm/w7gAyeDjuQbtZQJEEZ32KdhWWi', 'arjun.mehta@gmail.com', '9123456780', '1997-11-02 00:00:00', 'Male'),
(4, 'sneha_patil', '$2y$12$4C4v/ZrjLIVZ6gEbOTjgquOVAm/w7gAyeDjuQbtZQJEEZ32KdhWWi', 'sneha.patil@gmail.com', '9988776655', '2001-02-14 00:00:00', 'Female'),
(5, 'karan_singh', '$2y$12$4C4v/ZrjLIVZ6gEbOTjgquOVAm/w7gAyeDjuQbtZQJEEZ32KdhWWi', 'karan.singh@gmail.com', '9012345678', '1995-07-30 00:00:00', 'Male');

-- ============ counselors ============
INSERT INTO counselors (counselor_id, username, password, email, phone, date_of_birth, specialization, qualification, experience, rating) VALUES
(1, 'dr_ananya', '$2y$12$4C4v/ZrjLIVZ6gEbOTjgquOVAm/w7gAyeDjuQbtZQJEEZ32KdhWWi', 'ananya.counsel@welzone.com', '8800112233', '1985-03-10 00:00:00', 'Anxiety & Stress', 'Ph.D. Clinical Psychology', 14, 4.8),
(2, 'dr_vikram', '$2y$12$4C4v/ZrjLIVZ6gEbOTjgquOVAm/w7gAyeDjuQbtZQJEEZ32KdhWWi', 'vikram.counsel@welzone.com', '9900223344', '1980-08-25 00:00:00', 'Depression & Mood Disorders', 'M.D. Psychiatry', 18, 4.9),
(3, 'dr_meera', '$2y$12$4C4v/ZrjLIVZ6gEbOTjgquOVAm/w7gAyeDjuQbtZQJEEZ32KdhWWi', 'meera.counsel@welzone.com', '9112233445', '1988-12-05 00:00:00', 'Relationship Counselling', 'M.A. Counselling Psychology', 11, 4.7),
(4, 'dr_rohan', '$2y$12$4C4v/ZrjLIVZ6gEbOTjgquOVAm/w7gAyeDjuQbtZQJEEZ32KdhWWi', 'rohan.counsel@welzone.com', '9334455667', '1990-06-18 00:00:00', 'Mindfulness & CBT', 'M.Phil Clinical Psychology', 9, 4.6);

-- ============ courses ============
INSERT INTO courses (courseId, title, description, price, createdAt) VALUES
(1, 'Mindfulness for Beginners', 'A gentle 4-week program to build a daily mindfulness practice and reduce racing thoughts.', 29.99, '2026-01-10 09:00:00'),
(2, 'Understanding Anxiety', 'Learn what anxiety is, how it shows up in your body, and practical coping tools.', 39.99, '2026-01-15 10:30:00'),
(3, 'Building Healthy Relationships', 'Communication skills, boundaries, and attachment styles explained simply.', 49.99, '2026-02-01 14:00:00'),
(4, 'Sleep & Mood Reset', 'Restore your energy with science-backed sleep hygiene and evening wind-down routines.', 24.99, '2026-02-20 18:00:00'),
(5, 'CBT Self-Help Toolkit', 'A practical workbook approach to challenging unhelpful thought patterns.', 54.99, '2026-03-05 11:00:00');

-- ============ course_enrollments ============
INSERT INTO course_enrollments (userId, courseId, enrollmentDate, status) VALUES
(1, 1, '2026-02-10 09:00:00', 'ACTIVE'),
(1, 2, '2026-02-12 09:00:00', 'ACTIVE'),
(2, 1, '2026-02-15 09:00:00', 'ACTIVE'),
(2, 3, '2026-02-20 09:00:00', 'COMPLETED'),
(3, 4, '2026-03-01 09:00:00', 'ACTIVE'),
(4, 5, '2026-03-10 09:00:00', 'ACTIVE');

-- ============ qualifications ============
INSERT INTO qualifications (qualificationId, counselorId, qualification) VALUES
(1, 1, 'Ph.D. in Clinical Psychology - AIIMS'),
(2, 1, 'Certified CBT Practitioner'),
(3, 2, 'M.D. Psychiatry - NIMHANS'),
(4, 3, 'M.A. Counselling Psychology - TISS'),
(5, 3, 'Gottman Level 2 Certification'),
(6, 4, 'M.Phil Clinical Psychology - DU'),
(7, 4, 'Mindfulness-Based Stress Reduction Trainer');

-- ============ blog_posts ============
INSERT INTO blog_posts (id, counselor_id, title, content, created_at) VALUES
(1, 1, 'Five-Minute Calm: A Quick Grounding Exercise', 'When your mind is racing, your senses can anchor you. Try the 5-4-3-2-1 technique: name five things you can see, four you can touch, three you can hear, two you can smell, and one you can taste. This simple exercise pulls your attention back to the present moment and away from anxious thoughts.\n\nPractice it each morning and you will build a reflex of calm that follows you through your day.', '2026-05-02 09:00:00'),
(2, 2, 'Why Your Mood Dips in Winter', 'Seasonal changes can shift your energy, sleep, and appetite. If you notice your mood dipping as the days get shorter, you are not alone. A little extra daylight, movement, and structure can make a big difference.\n\nRemember: low moods are information, not a verdict. Reaching out early is a sign of strength.', '2026-05-10 10:00:00'),
(3, 3, 'Setting Boundaries Without Guilt', 'Boundaries protect your energy and your relationships. Start small: say no to one thing you do not have capacity for this week. Notice the guilt, breathe through it, and let it pass.\n\nYou are allowed to take up space and rest.', '2026-05-18 12:00:00'),
(4, 4, 'A Beginner''s Guide to Breathing', 'Your breath is the fastest tool you own. Try box breathing: inhale for four counts, hold for four, exhale for four, hold for four. Repeat for two minutes.\n\nConsistency beats intensity — a daily two minutes will change your baseline.', '2026-05-25 08:30:00');

-- ============ comments ============
INSERT INTO comments (commentId, feedbackId, comment) VALUES
(1, 1, 'The grounding technique actually helped during my exam week.'),
(2, 1, 'Would love more guided audio for this.'),
(3, 2, 'The box breathing explanation was very clear.'),
(4, 3, 'The boundary scripts felt really practical.');

-- ============ blog_readings ============
INSERT INTO blog_readings (blogId, userId, time) VALUES
(1, 1, 600000),
(1, 2, 300000),
(2, 1, 450000),
(3, 3, 120000);

-- ============ moods ============
INSERT INTO moods (id, mood_type) VALUES
(1, 'Happy'),
(2, 'Anxious'),
(3, 'Angry'),
(4, 'Demotivated'),
(5, 'Worthless'),
(6, 'Sad');

-- ============ user_mood ============
INSERT INTO user_mood (id, user_id, mood_id, mood_set_at) VALUES
(1, 1, 2, '2026-08-01 09:00:00'),
(2, 1, 1, '2026-08-03 09:30:00'),
(3, 1, 6, '2026-08-05 10:00:00'),
(4, 2, 1, '2026-08-02 08:00:00'),
(5, 2, 1, '2026-08-04 08:30:00'),
(6, 3, 3, '2026-08-03 12:00:00');

-- ============ daily_mood_log ============
INSERT INTO daily_mood_log (mood_id, auditId) VALUES
(1, 1),
(2, 2),
(6, 3),
(1, 4);

-- ============ chat_messages ============
INSERT INTO chat_messages (id, session_id, sender_id, sender_type, message, timestamp) VALUES
(1, 1, 1, 'USER', 'Hi, I have been feeling really anxious lately.', '2026-08-10 11:00:00'),
(2, 1, 1, 'COUNSELOR', 'Thank you for sharing that. Anxiety can feel overwhelming, but you are in a safe space.', '2026-08-10 11:02:00'),
(3, 1, 1, 'USER', 'It gets worse before my meetings.', '2026-08-10 11:03:00'),
(4, 1, 1, 'COUNSELOR', 'Let us try a quick grounding exercise together.', '2026-08-10 11:04:00'),
(5, 2, 2, 'USER', 'I could not sleep all night, my mind would not stop.', '2026-08-11 22:00:00'),
(6, 2, 3, 'COUNSELOR', 'A racing mind at night is very common. Let us talk about a wind-down routine.', '2026-08-11 22:02:00');

-- ============ slots ============
INSERT INTO slots (id, counselor_id, user_id, start_time, end_time, booked) VALUES
(1, 1, NULL, '2026-08-20 10:00:00', '2026-08-20 10:45:00', 0),
(2, 1, NULL, '2026-08-21 15:00:00', '2026-08-21 15:45:00', 0),
(3, 2, NULL, '2026-08-22 11:00:00', '2026-08-22 11:45:00', 0),
(4, 3, NULL, '2026-08-23 09:30:00', '2026-08-23 10:15:00', 0),
(5, 4, NULL, '2026-08-24 16:00:00', '2026-08-24 16:45:00', 0),
(6, 1, 1, '2026-08-18 14:00:00', '2026-08-18 14:45:00', 1),
(7, 2, 2, '2026-08-19 12:00:00', '2026-08-19 12:45:00', 1);

-- ============ course_log ============
INSERT INTO course_log (auditId, courseId) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4);

-- ============ feedback ============
INSERT INTO feedback (feedbackId, sessionId, rating, comments, createdAt) VALUES
(1, 1, 5, 'Very helpful and calming session.', '2026-08-18 15:00:00'),
(2, 2, 4, 'Great tools for sleep, would like longer sessions.', '2026-08-19 13:00:00'),
(3, 3, 5, 'Finally understood my pattern of anxious thoughts.', '2026-08-20 12:00:00');

-- ============ feedback_log ============
INSERT INTO feedback_log (auditId, feedbackId) VALUES
(1, 1),
(2, 2),
(3, 3);

-- ============ session_logs ============
INSERT INTO session_logs (logId, sessionId, log_time, log_details) VALUES
(1, 1, '2026-08-10 11:00:00', 'User booked a slot'),
(2, 6, '2026-08-18 14:00:00', 'User booked a slot'),
(3, 7, '2026-08-19 12:00:00', 'User booked a slot');

-- ============ audit_logs ============
INSERT INTO audit_logs (auditId, userId, counselorId, action, details, created_at) VALUES
(1, 1, NULL, 'Registered', 'User registered successfully', '2026-08-01 10:00:00'),
(2, 1, NULL, 'Logged In', 'User logged in successfully', '2026-08-02 09:00:00'),
(3, NULL, 1, 'Registered', 'Counselor registered successfully', '2026-08-01 11:00:00'),
(4, NULL, 1, 'Create', 'Counselor created a slot', '2026-08-05 12:00:00');

SET FOREIGN_KEY_CHECKS = 1;