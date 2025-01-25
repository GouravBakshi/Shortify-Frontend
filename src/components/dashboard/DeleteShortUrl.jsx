import React from 'react'
import api from '../../api/api';
import { useStoreContext } from '../../contextApi/ContextApi';
import { MdDeleteForever } from 'react-icons/md';
import toast from 'react-hot-toast';

const DeleteShortUrl = ({ urlId, refetch }) => {
    const { token } = useStoreContext();

    const handleDelete = async () => {
        try {
            const { data } = await api.delete(`/api/urls/${urlId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // console.log(data);
            toast.success("URL deleted successfully!");
            await refetch();
        } catch (error) {
            toast.error("Failed to delete URL.");
        }
    };

    return (
        <div
            onClick={handleDelete}
            className="flex cursor-pointer gap-1 items-center bg-rose-700 py-2 font-semibold shadow-md shadow-slate-500 sm:px-6 px-3 rounded-md text-white"
        >
            <button className="text-sm sm:text-base">
                <MdDeleteForever className="text-[1.3rem]" />
            </button>
        </div>
    )
}

export default DeleteShortUrl;
