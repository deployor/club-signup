'use client';

import {useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import {supabase} from '../utils/supabaseClient';

export default function Callback() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    let isMounted = true;

    const handleCallback = async () => {
      try {
        const {data: {session}, error} = await supabase.auth.getSession();
        const emailValidationEnabled = process.env.NEXT_PUBLIC_EMAIL_VALIDATION_ENABLED === 'true';

        if (!isMounted) return;

        if (error) throw error;

        if (session?.user?.email) {
          if (emailValidationEnabled && !session.user.email.endsWith(`@${process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAIN}`)) {
            await supabase.auth.signOut();
            if (isMounted) {
              router.replace('/invalid-email');
            }
            return;
          }
          if (isMounted) {
            router.replace('/');
          }
        }
      } catch (error) {
        console.error('Auth error:', error);
        if (isMounted) {
          router.replace('/invalid-email');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    handleCallback();

    return () => {
      isMounted = false;
    };
  }, [router]);

  if (!mounted) return null;

  return (
      <div className="flex items-center justify-center min-h-screen bg-gray-900">
        {loading ? (
            <div className="flex flex-col justify-center items-center min-h-screen">
              <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
              <p className="mt-4 text-lg font-semibold">Signing in...</p>
            </div>) : (
            <div className="flex flex-col justify-center items-center min-h-screen">
              <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
              <p className="mt-4 text-lg font-semibold">Redirecting...</p>
            </div>)}
      </div>
  );
}
