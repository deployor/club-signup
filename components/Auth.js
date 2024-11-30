"use client";

import {useEffect, useState} from "react";
import {supabase} from "../utils/supabaseClient";
import {useRouter} from "next/navigation";

const ALLOWED_DOMAIN = process.env.NEXT_PUBLIC_ALLOWED_EMAIL_DOMAIN;
const EMAIL_VALIDATION_ENABLED = process.env.NEXT_PUBLIC_EMAIL_VALIDATION_ENABLED === 'true';

export default function Auth() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        checkUserEmail();
    }, []);

    const checkUserEmail = async () => {
        const {
            data: {session},
        } = await supabase.auth.getSession();
        if (session?.user?.email && EMAIL_VALIDATION_ENABLED) {
            const emailDomain = session.user.email.split("@")[1];
            if (emailDomain !== ALLOWED_DOMAIN) {
                await handleInvalidEmail();
            }
        }
    };

    const handleInvalidEmail = async () => {
        await supabase.auth.signOut();
        setError("Please use your school email (@example.com) to vote.");
        router.push('/invalid-email');
    };

    const signInWithMicrosoft = async () => {
        try {
            setLoading(true);
            setError(null);
            const {error} = await supabase.auth.signInWithOAuth({
                provider: "azure",
                options: {
                    scopes: "email openid profile",
                    redirectTo: `${window.location.origin}/callback`,
                    queryParams: {
                        response_type: "code",
                        prompt: "select_account",
                    },
                },
            });
            if (error) throw error;
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8 space-y-8 border border-gray-700">
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-md p-3 text-sm">
                        {error}
                    </div>
                )}

                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold text-white">DEMO Club Signup</h1>
                    <p className="text-gray-400 text-sm">This is a demoooo!</p>
                </div>

                <div className="flex justify-center my-20">
                    <img src="https://assets.hackclub.com/icon-rounded.png" alt="Logo" className="w-1/4 h-auto"/>
                </div>

                <button
                    onClick={signInWithMicrosoft}
                    disabled={loading}
                    className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                    {loading ? (
                        <span>Signing in...</span>
                    ) : (
                        <span>Sign in with Microsoft (Office)</span>
                    )}
                </button>

                <p className="text-sm text-gray-400 text-center">
                    Note: Normally only accepts school emails, but everything works as this is a demooooo! <br/><br/>
                    After signing in, you will be redirected to the confirmation page. <br/><br/>
                    Your email address will only be used for club organization. More information can be found at: <a href="/privacy"
                        className="text-blue-500 underline">/privacy</a>.
                </p>
            </div>
        </div>
    );
}
