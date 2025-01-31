import React from 'react'
import api from '../../api/api';
import { useStoreContext } from '../../contextApi/ContextApi';
import { MdDelete } from 'react-icons/md';
import toast from 'react-hot-toast';
import { IconButton, Tooltip } from '@mui/material';

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
            className="flex cursor-pointer gap-1 items-center py-2"
        >
            
            <Tooltip title="Delete" arrow>
                <IconButton>
                    <MdDelete className='sm:text-[2rem] text-[1.4rem]' />
                </IconButton>
            </Tooltip>
        </div>
    )
}

export default DeleteShortUrl;
