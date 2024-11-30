'use client';

import {supabase} from '../utils/supabaseClient';
import {useRouter} from 'next/navigation';

export default function ThankYou() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            await supabase.auth.signOut();
            router.push('/');
        } catch (error) {
            console.error('Error signing out:', error);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 p-4">
            <div
                className="w-full max-w-md bg-gray-800 rounded-lg shadow-xl p-8 text-center space-y-6 border border-gray-700">
                <div className="w-16 h-16 mx-auto bg-green-500 rounded-full flex items-center justify-center">
                    <svg
                        className="w-8 h-8 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                        />
                    </svg>
                </div>
                <div className="space-y-3">
                    <h1 className="text-3xl font-bold text-white">
                        Thank you!
                    </h1>
                    <p className="text-gray-300">
                        Thank you for your feedback! <br/>
                        If you want to log out, please visit this page again!
                    </p>
                </div>
                <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-md font-medium transition-colors duration-200"
                >
                    Home
                </button>
            </div>
        </div>
    );
}