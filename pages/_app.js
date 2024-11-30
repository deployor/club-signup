import '../styles/globals.css';
import {useEffect, useState} from 'react';
import {supabase} from '../utils/supabaseClient';
import {ThemeProvider} from 'next-themes';

function MyApp({Component, pageProps}) {
    const [session, setSession] = useState(null);

    useEffect(() => {
        // Fetch the current session
        const getSession = async () => {
            const {
                data: {session},
                error,
            } = await supabase.auth.getSession();

            if (error) {
                console.error('Error fetching session:', error.message);
            } else {
                setSession(session);
            }
        };

        getSession();

        // Listen for changes to the auth state
        const {
            data: {subscription},
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <ThemeProvider attribute="class">
            <Component {...pageProps} session={session}/>
        </ThemeProvider>
    );
}

export default MyApp;