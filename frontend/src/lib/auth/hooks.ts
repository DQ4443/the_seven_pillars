'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import type { User } from '@supabase/supabase-js'

export function useUser() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_, session) => {
        setUser(session?.user ?? null)
        setLoading(false)
      }
    )

    // Initial fetch
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [supabase.auth])

  return { user, loading }
}

export function useProfile() {
  const { user, loading: userLoading } = useUser()
  const [profile, setProfile] = useState<{
    id: string
    role: 'admin' | 'parent' | 'student'
    full_name: string
    email: string
    phone?: string
  } | null>(null)
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    if (userLoading) return

    if (!user) {
      setProfile(null)
      setLoading(false)
      return
    }

    supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single()
      .then(({ data, error }) => {
        if (error) {
          console.error('Error fetching profile:', error)
          setProfile(null)
        } else {
          setProfile(data)
        }
        setLoading(false)
      })
  }, [user, userLoading, supabase])

  return { user, profile, loading: userLoading || loading }
}
