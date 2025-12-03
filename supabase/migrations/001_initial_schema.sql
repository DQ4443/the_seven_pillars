-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create role enum
CREATE TYPE user_role AS ENUM ('admin', 'parent', 'student');

-- Profiles table (linked to Supabase Auth)
CREATE TABLE profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    role user_role NOT NULL DEFAULT 'student',
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Family relationships (parent-child)
CREATE TABLE relationships (
    id SERIAL PRIMARY KEY,
    parent_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(parent_id, student_id)
);

-- Subjects
CREATE TABLE subjects (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    curriculum_code TEXT,
    year_level INT NOT NULL CHECK (year_level >= 1 AND year_level <= 12),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Classes
CREATE TABLE classes (
    id SERIAL PRIMARY KEY,
    subject_id INT NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    start_time TIMESTAMPTZ NOT NULL,
    end_time TIMESTAMPTZ NOT NULL,
    teacher_name TEXT NOT NULL,
    meet_link TEXT,
    recurring BOOLEAN NOT NULL DEFAULT false,
    recurrence_rule TEXT, -- RRULE format for recurring events
    max_students INT DEFAULT 20,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CHECK (end_time > start_time)
);

-- Enrollments
CREATE TABLE enrollments (
    id SERIAL PRIMARY KEY,
    class_id INT NOT NULL REFERENCES classes(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    enrolled_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'withdrawn', 'completed')),
    UNIQUE(class_id, student_id)
);

-- Resources/Files
CREATE TABLE resources (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    file_url TEXT NOT NULL,
    file_type TEXT,
    file_size INT,
    student_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    class_id INT REFERENCES classes(id) ON DELETE SET NULL,
    uploaded_by UUID NOT NULL REFERENCES profiles(id),
    uploaded_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    is_public BOOLEAN NOT NULL DEFAULT false
);

-- Entrance tests
CREATE TABLE entrance_tests (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    year_level INT NOT NULL CHECK (year_level >= 1 AND year_level <= 12),
    time_limit_minutes INT DEFAULT 60,
    is_active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Test questions
CREATE TABLE test_questions (
    id SERIAL PRIMARY KEY,
    test_id INT NOT NULL REFERENCES entrance_tests(id) ON DELETE CASCADE,
    question_text TEXT NOT NULL,
    question_type TEXT NOT NULL CHECK (question_type IN ('multiple_choice', 'short_answer', 'essay')),
    options JSONB, -- For multiple choice: {"a": "Option A", "b": "Option B", ...}
    correct_answer TEXT, -- For auto-grading multiple choice/short answer
    points INT NOT NULL DEFAULT 1,
    order_index INT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Test submissions
CREATE TABLE test_submissions (
    id SERIAL PRIMARY KEY,
    test_id INT NOT NULL REFERENCES entrance_tests(id) ON DELETE CASCADE,
    student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
    started_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    submitted_at TIMESTAMPTZ,
    score INT,
    max_score INT,
    graded_by UUID REFERENCES profiles(id),
    graded_at TIMESTAMPTZ,
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'submitted', 'graded')),
    UNIQUE(test_id, student_id)
);

-- Test answers
CREATE TABLE test_answers (
    id SERIAL PRIMARY KEY,
    submission_id INT NOT NULL REFERENCES test_submissions(id) ON DELETE CASCADE,
    question_id INT NOT NULL REFERENCES test_questions(id) ON DELETE CASCADE,
    answer_text TEXT,
    is_correct BOOLEAN,
    points_awarded INT,
    feedback TEXT,
    UNIQUE(submission_id, question_id)
);

-- FAQ entries (for public site)
CREATE TABLE faq_entries (
    id SERIAL PRIMARY KEY,
    question_en TEXT NOT NULL,
    answer_en TEXT NOT NULL,
    question_zh TEXT, -- Chinese translation
    answer_zh TEXT,
    category TEXT,
    order_index INT NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes for common queries
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_relationships_parent ON relationships(parent_id);
CREATE INDEX idx_relationships_student ON relationships(student_id);
CREATE INDEX idx_classes_subject ON classes(subject_id);
CREATE INDEX idx_classes_start_time ON classes(start_time);
CREATE INDEX idx_enrollments_student ON enrollments(student_id);
CREATE INDEX idx_enrollments_class ON enrollments(class_id);
CREATE INDEX idx_resources_student ON resources(student_id);
CREATE INDEX idx_resources_class ON resources(class_id);
CREATE INDEX idx_test_submissions_student ON test_submissions(student_id);
CREATE INDEX idx_test_submissions_status ON test_submissions(status);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply updated_at triggers
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_subjects_updated_at BEFORE UPDATE ON subjects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_classes_updated_at BEFORE UPDATE ON classes
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_entrance_tests_updated_at BEFORE UPDATE ON entrance_tests
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faq_entries_updated_at BEFORE UPDATE ON faq_entries
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
