-- Create storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES
    ('resources', 'resources', false),
    ('avatars', 'avatars', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for resources bucket
CREATE POLICY "Admins can upload resources"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'resources' AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can update resources"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'resources' AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Admins can delete resources"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'resources' AND
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND role = 'admin')
);

CREATE POLICY "Authenticated users can read resources"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'resources');

-- Storage policies for avatars bucket (public)
CREATE POLICY "Anyone can view avatars"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can update own avatar"
ON storage.objects FOR UPDATE
TO authenticated
USING (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
);

CREATE POLICY "Users can delete own avatar"
ON storage.objects FOR DELETE
TO authenticated
USING (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
);
