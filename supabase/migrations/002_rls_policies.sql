-- Enable Row Level Security on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE relationships ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE classes ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE entrance_tests ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE test_answers ENABLE ROW LEVEL SECURITY;
ALTER TABLE faq_entries ENABLE ROW LEVEL SECURITY;

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 FROM profiles
        WHERE id = auth.uid() AND role = 'admin'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Helper function to get user's children
CREATE OR REPLACE FUNCTION get_children_ids()
RETURNS SETOF UUID AS $$
BEGIN
    RETURN QUERY
    SELECT student_id FROM relationships
    WHERE parent_id = auth.uid();
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- PROFILES POLICIES
-- ============================================

-- Users can read their own profile
CREATE POLICY "Users can view own profile" ON profiles
    FOR SELECT USING (auth.uid() = id);

-- Parents can view their children's profiles
CREATE POLICY "Parents can view children profiles" ON profiles
    FOR SELECT USING (
        id IN (SELECT get_children_ids())
    );

-- Admins can view all profiles
CREATE POLICY "Admins can view all profiles" ON profiles
    FOR SELECT USING (is_admin());

-- Users can update their own profile
CREATE POLICY "Users can update own profile" ON profiles
    FOR UPDATE USING (auth.uid() = id)
    WITH CHECK (auth.uid() = id AND role = (SELECT role FROM profiles WHERE id = auth.uid()));

-- Admins can update any profile
CREATE POLICY "Admins can update any profile" ON profiles
    FOR UPDATE USING (is_admin());

-- Admins can insert profiles
CREATE POLICY "Admins can insert profiles" ON profiles
    FOR INSERT WITH CHECK (is_admin());

-- ============================================
-- RELATIONSHIPS POLICIES
-- ============================================

-- Parents can view their own relationships
CREATE POLICY "Parents can view own relationships" ON relationships
    FOR SELECT USING (parent_id = auth.uid());

-- Admins can manage all relationships
CREATE POLICY "Admins can manage relationships" ON relationships
    FOR ALL USING (is_admin());

-- ============================================
-- SUBJECTS POLICIES
-- ============================================

-- Everyone can view subjects
CREATE POLICY "Anyone can view subjects" ON subjects
    FOR SELECT USING (true);

-- Admins can manage subjects
CREATE POLICY "Admins can manage subjects" ON subjects
    FOR ALL USING (is_admin());

-- ============================================
-- CLASSES POLICIES
-- ============================================

-- Everyone can view classes
CREATE POLICY "Anyone can view classes" ON classes
    FOR SELECT USING (true);

-- Admins can manage classes
CREATE POLICY "Admins can manage classes" ON classes
    FOR ALL USING (is_admin());

-- ============================================
-- ENROLLMENTS POLICIES
-- ============================================

-- Students can view their own enrollments
CREATE POLICY "Students can view own enrollments" ON enrollments
    FOR SELECT USING (student_id = auth.uid());

-- Parents can view their children's enrollments
CREATE POLICY "Parents can view children enrollments" ON enrollments
    FOR SELECT USING (student_id IN (SELECT get_children_ids()));

-- Admins can manage all enrollments
CREATE POLICY "Admins can manage enrollments" ON enrollments
    FOR ALL USING (is_admin());

-- ============================================
-- RESOURCES POLICIES
-- ============================================

-- Public resources are visible to all
CREATE POLICY "Anyone can view public resources" ON resources
    FOR SELECT USING (is_public = true);

-- Students can view their own resources
CREATE POLICY "Students can view own resources" ON resources
    FOR SELECT USING (student_id = auth.uid());

-- Students can view resources for their classes
CREATE POLICY "Students can view class resources" ON resources
    FOR SELECT USING (
        class_id IN (
            SELECT class_id FROM enrollments WHERE student_id = auth.uid()
        )
    );

-- Parents can view their children's resources
CREATE POLICY "Parents can view children resources" ON resources
    FOR SELECT USING (student_id IN (SELECT get_children_ids()));

-- Admins can manage all resources
CREATE POLICY "Admins can manage resources" ON resources
    FOR ALL USING (is_admin());

-- ============================================
-- ENTRANCE TESTS POLICIES
-- ============================================

-- Active tests are visible to all
CREATE POLICY "Anyone can view active tests" ON entrance_tests
    FOR SELECT USING (is_active = true);

-- Admins can manage all tests
CREATE POLICY "Admins can manage tests" ON entrance_tests
    FOR ALL USING (is_admin());

-- ============================================
-- TEST QUESTIONS POLICIES
-- ============================================

-- Questions for active tests are visible to authenticated users
CREATE POLICY "Authenticated can view test questions" ON test_questions
    FOR SELECT USING (
        auth.uid() IS NOT NULL AND
        test_id IN (SELECT id FROM entrance_tests WHERE is_active = true)
    );

-- Admins can manage all questions
CREATE POLICY "Admins can manage questions" ON test_questions
    FOR ALL USING (is_admin());

-- ============================================
-- TEST SUBMISSIONS POLICIES
-- ============================================

-- Students can view and manage their own submissions
CREATE POLICY "Students can view own submissions" ON test_submissions
    FOR SELECT USING (student_id = auth.uid());

CREATE POLICY "Students can insert own submissions" ON test_submissions
    FOR INSERT WITH CHECK (student_id = auth.uid());

CREATE POLICY "Students can update own in-progress submissions" ON test_submissions
    FOR UPDATE USING (student_id = auth.uid() AND status = 'in_progress');

-- Parents can view their children's submissions
CREATE POLICY "Parents can view children submissions" ON test_submissions
    FOR SELECT USING (student_id IN (SELECT get_children_ids()));

-- Admins can manage all submissions
CREATE POLICY "Admins can manage submissions" ON test_submissions
    FOR ALL USING (is_admin());

-- ============================================
-- TEST ANSWERS POLICIES
-- ============================================

-- Students can manage their own answers (for in-progress submissions)
CREATE POLICY "Students can view own answers" ON test_answers
    FOR SELECT USING (
        submission_id IN (
            SELECT id FROM test_submissions WHERE student_id = auth.uid()
        )
    );

CREATE POLICY "Students can insert own answers" ON test_answers
    FOR INSERT WITH CHECK (
        submission_id IN (
            SELECT id FROM test_submissions
            WHERE student_id = auth.uid() AND status = 'in_progress'
        )
    );

CREATE POLICY "Students can update own answers" ON test_answers
    FOR UPDATE USING (
        submission_id IN (
            SELECT id FROM test_submissions
            WHERE student_id = auth.uid() AND status = 'in_progress'
        )
    );

-- Parents can view their children's answers
CREATE POLICY "Parents can view children answers" ON test_answers
    FOR SELECT USING (
        submission_id IN (
            SELECT id FROM test_submissions
            WHERE student_id IN (SELECT get_children_ids())
        )
    );

-- Admins can manage all answers
CREATE POLICY "Admins can manage answers" ON test_answers
    FOR ALL USING (is_admin());

-- ============================================
-- FAQ ENTRIES POLICIES
-- ============================================

-- Published FAQs are visible to everyone
CREATE POLICY "Anyone can view published FAQs" ON faq_entries
    FOR SELECT USING (is_published = true);

-- Admins can manage all FAQs
CREATE POLICY "Admins can manage FAQs" ON faq_entries
    FOR ALL USING (is_admin());
