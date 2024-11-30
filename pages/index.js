'use client';

import {useEffect, useState} from 'react';
import {supabase} from '../utils/supabaseClient';
import Auth from '../components/Auth';
import Signup from '../components/Signup';

export default function Home() {
    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        checkSession();

        const {data: {subscription}} = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setLoading(false);
        });

        return () => subscription?.unsubscribe();
    }, []);

    const checkSession = async () => {
        try {
            const {data: {session}, error} = await supabase.auth.getSession();
            if (error) throw error;
            setSession(session);
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const getErrorMessage = (errorType) => {
        switch (errorType) {
            case 'school-email-required':
                return 'Sign in with school email!!!!';
            case 'voting-failed':
                return "ERROR. Please try logging in again, if issue persists contact support.";
            default:
                return null;
        }
    };

    if (loading) {
        return (
            <div className="flex flex-col justify-center items-center min-h-screen">
                <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
                <p className="mt-4 text-lg font-semibold">Loading...</p>
            </div>
        );
    }

    if (error) {
        return <div className="text-red-500 text-center">{error}</div>;
    }

    if (!session) {
        return <Auth />;
    }

    return <Signup session={session} />;
}