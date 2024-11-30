'use client';

import {supabase} from '../utils/supabaseClient';
import {useRouter} from 'next/navigation';

export default function UnknownError() {
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.push('/');
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
            <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8 space-y-6 border border-gray-700">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 mx-auto bg-red-500 rounded-full flex items-center justify-center">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                  d="M6 18L18 6M6 6l12 12"/>
                        </svg>
                    </div>

                    <h1 className="text-2xl font-bold text-white">Unknown Error</h1>

                    <p className="text-gray-300">
                        Please try again, and if the problem persists, contact support.
                    </p>
                </div>

                <button
                    onClick={handleSignOut}
                    className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-medium transition-colors duration-200"
                >
                    Try Again
                </button>
            </div>
        </div>
    );
}