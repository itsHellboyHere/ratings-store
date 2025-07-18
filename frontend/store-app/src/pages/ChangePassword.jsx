import { useState } from 'react';
import axios from '../api/axios';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuthContext } from '../context/AuthContext';

const ChangePassword = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    const { authUser, setAuthUser } = useAuthContext();

    // Update user
    const updateAuthUser = (updates) => {
        const updatedUser = { ...authUser, ...updates };
        setAuthUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        try {
            setLoading(true);
            setError('');

            const res = await axios.put('/users/change-password', { newPassword });

            toast.success(res.data.message);

            updateAuthUser({ mustChangePassword: false });
            navigate('/dashboard');
        } catch (err) {
            console.error("Password update error:", err);
            setError(err.response?.data?.error || "Failed to update password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <main className='max-w-md mx-auto p-10'>
            <h3 className='text-xl font-bold mb-4 text-gray-700'>Change Your Password</h3>



            <Link
                to='/dashboard'
                className='text-blue-600 hover:underline mb-5 inline-block'
            >
                &larr; Back to Dashboard
            </Link>
            <div className="flex w-full rounded-sm justify-center items-center p-4"
                style={{
                    boxShadow: "rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px"
                }}
            >

                <form className='space-y-4' onSubmit={handleSubmit}>
                    {error && <p className="text-red-600 mb-4">{error}</p>}
                    <input
                        type="password"
                        placeholder="New Password"
                        className='w-full p-2 border rounded'
                        value={newPassword}
                        onChange={(e) => {
                            setNewPassword(e.target.value);
                            setError('');
                        }}
                    />

                    <input
                        type="password"
                        placeholder="Confirm New Password"
                        className='w-full p-2 border rounded'
                        value={confirmPassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value);
                            setError('');
                        }}
                    />

                    <button
                        type="submit"
                        className='w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:opacity-60'
                        disabled={loading || newPassword !== confirmPassword}
                    >
                        {loading ? 'Changing...' : 'Change Password'}
                    </button>
                </form>
            </div>
            <p className='mt-4 text-sm text-gray-500'>
                Make sure to choose a strong password (8-16 characters, one uppercase letter, and one special character).
            </p>
        </main>
    );
};

export default ChangePassword;
