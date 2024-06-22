'use client'

import { removeItem } from '@/app/actions/removeAction';
import Link from 'next/link';
import React from 'react';

const Remove = ({ params }) => {

    const handleRemove = async () => {
        await removeItem(params.id);
        console.log('my delete id', params.id);
    };

    return (
        <div className="flex items-center justify-center max-w-full min-h-screen">
            <div className="flex flex-col items-center justify-center gap-4 p-4 bg-orange-500 rounded-md shadow-lg">
                <h2 className='font-bold text-white'>Are you sure to delete this item?</h2>
                <div className="flex items-center justify-center gap-8">
                    <Link href={'/'}>
                        <button className="p-3 text-white bg-green-600 rounded-md hover:bg-green-800">
                            No
                        </button>
                    </Link>
                    <button onClick={handleRemove} className="p-3 text-white bg-red-600 rounded-md hover:bg-red-800">
                        Yes
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Remove;
