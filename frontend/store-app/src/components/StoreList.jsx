import React, { useEffect, useState } from 'react'
import axios from '../api/axios'
import { Link } from 'react-router-dom';
const StoreList = () => {
    const [stores, setStores] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [sortOrder, setSortOrder] = useState('desc');
    // console.log(stores)
    const fetchStores = async () => {
        try {
            setLoading(true)
            const res = await axios.get("/admin/stores");
            res.data.sort((a, b) => parseFloat(b.avgRating) - parseFloat(a.avgRating))
            // console.log(sortedData)
            setStores(res.data);

        } catch (err) {
            console.log(err);
            setError(err.response?.data?.error || 'Failed to fetch stores')
        } finally {
            setLoading(false)
        }
    }
    const handleSortToggle = (e) => {
        const newSortOrder = e.target.value;
        setSortOrder(newSortOrder)

        const newSorted = [...stores].sort((a, b) => {
            const ratingA = parseFloat(a.avgRating)
            const ratingB = parseFloat(b.avgRating)
            return newSortOrder === 'asc' ? ratingA - ratingB : ratingB - ratingA;
        });
        setStores(newSorted);
    }

    useEffect(() => {
        fetchStores();
    }, [])

    if (loading) {
        return (
            <main className="max-w-5xl mx-auto p-6">
                <h2 className="text-2xl font-semibold text-gray-700 mb-4">All Stores</h2>
                <div className="space-y-4 animate-pulse ">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-6 w-full bg-gray-200 rounded"></div>
                    ))}
                </div>
            </main>
        );
    }
    if (error) {
        return <p className="text-red-600 p-4">{error}</p>;
    }


    return (
        <main className='max-w-5xl mx-auto p-6 relative'>
            <div className="flex items-center justify-between mb-4">
                <h2 className='text-2xl font-bold text-gray-600'>All Stores</h2>
                <select
                    name='sort'
                    className='border rounded-l p-2  bg-emerald-100 text-sm text-gray-700  hover:bg-emerald-200 transition'
                    value={sortOrder}
                    onChange={handleSortToggle}
                >
                    <option value="">Sort by</option>
                    <option value="desc">highest</option>
                    <option value="asc">lowest</option>
                </select>
            </div>
            <div className="overflow-x-auto ">
                <table className='border w-full border-gray-400 rounded '>
                    <thead className='bg-gray-100 text-left'>
                        <tr>
                            <th className="p-2 border">Name</th>
                            <th className="p-2 border">Email</th>
                            <th className="p-2 border">Address</th>
                            <th className="p-2 border">Avg Rating</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stores.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center p-4 text-gray-600">
                                    No stores found.
                                </td>
                            </tr>
                        ) : (
                            stores.map((store) => (
                                <tr key={store.id} className="hover:bg-gray-50">
                                    <td className="p-2 border">
                                        <Link to={`/stores/${store.id}`} className="text-blue-600 hover:underline">
                                            {store.name}
                                        </Link>
                                    </td>
                                    <td className="p-2 border">{store.email}</td>
                                    <td className="p-2 border">{store.address}</td>
                                    <td className="p-2 border text-yellow-600 font-semibold">{store.avgRating}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>

            </div>

        </main>
    )
}

export default StoreList