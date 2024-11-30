"use client";

import { useEffect, useState } from "react";
import { supabase } from "../utils/supabaseClient";
import { useRouter } from "next/navigation";

export default function Signup({ session }) {
    const [signedUp, setSignedUp] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const router = useRouter();

    useEffect(() => {
        if (!session) {
            router.push("/");
            return;
        }
        fetchSignupStatus();
    }, [session, router]);

    const fetchSignupStatus = async () => {
        try {
            const { data, error } = await supabase
                .from("signups")
                .select("signed_up")
                .eq("email", session.user.email)
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            if (data) {
                setSignedUp(data.signed_up);
            }
        } catch (error) {
            console.error("Error fetching signup status:", error);
            router.push('/error');
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const { error } = await supabase
                .from("signups")
                .upsert(
                    { email: session.user.email, signed_up: signedUp },
                    { onConflict: "email" }
                );
            if (error) throw error;
            router.push('/thank-you');
        } catch (error) {
            console.error("Error updating signup status:", error);
            router.push('/error');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gray-900">
              <div className="loader border-t-4 border-blue-500 rounded-full w-16 h-16 animate-spin"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8 space-y-8 border border-gray-700">
                <h1 className="text-3xl font-bold text-white text-center">
                    Sign Up for Hack Club
                </h1>
                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 rounded-md p-3 text-sm text-center">
                        {error}
                    </div>
                )}
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="flex flex-col items-center justify-center">
                        <input
                            type="checkbox"
                            checked={signedUp}
                            onChange={(e) => setSignedUp(e.target.checked)}
                            className="form-checkbox h-6 w-6 text-blue-600 mb-2"
                        />
                        <label className="text-gray-300 text-sm font-medium">
                            I want to sign up for Hack Club
                        </label>
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? 'Submitting...' : 'Sign Up'}
                    </button>
                </form>
            </div>
        </div>
    );
}