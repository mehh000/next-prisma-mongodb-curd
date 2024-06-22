'use client'

import { findForUpdate, updateItem } from '@/app/actions/updateAction';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { FaHome } from 'react-icons/fa';

const UpdateForm = ({ id }) => {
    const router = useRouter();
    const { register, handleSubmit, formState: { errors }, watch, setValue } = useForm();
    const [totalAmount, setTotalAmount] = useState(0);
    const [itemFromId, setItemFromId] = useState({});

    // Watch for changes in price and quantity using react-hook-form's watch function
    const price = watch('price', 0);
    const quentity = watch('quentity', 0);

    // Update total amount whenever price or quantity changes
    useEffect(() => {
        const totalPrice = parseFloat(price) * parseInt(quentity);
        setTotalAmount(isNaN(totalPrice) ? 0 : totalPrice);
    }, [price, quentity]);

    // Fetch data on component mount
    useEffect(() => {
        const sendDataToFind = async () => {
            console.log('my edit item id :', id);
            const whatiGet = await findForUpdate(id);
            setItemFromId(whatiGet);
            setValue('itemName', whatiGet.itemName);
            setValue('price', whatiGet.price);
            setValue('quentity', whatiGet.quentity);
            setTotalAmount(whatiGet.totalAmount);
        };
        sendDataToFind();
    }, [id, setValue]);

    const onSubmit = async (data) => {
        // Handle form submission here
        const newFormData = { ...data, totalAmount };
        await updateItem(id, newFormData);
        router.push('/');
    };

    return (
        <div className="flex items-center justify-center w-full h-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg px-8 pt-6 pb-8 mb-4 bg-white border rounded shadow-2xl">
                <h1 className="w-full p-3 mb-3 font-bold text-center text-white bg-blue-600 rounded-md">
                    <Link href={'/'}><FaHome size={20} className='hover:text-gray-400' /></Link>
                    Update Form
                </h1>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="itemName">
                        Item Name
                    </label>
                    <input {...register("itemName", { required: true })} id="itemName" type="text" className="w-full px-3 py-2 border rounded-md" />
                    {errors.itemName && <span className="text-red-600">Item name is required</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="price">
                        Item Price
                    </label>
                    <input
                        {...register("price", { required: true, valueAsNumber: true })}
                        id="price"
                        type="number"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    {errors.price && <span className="text-red-600">Price is required</span>}
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="quentity">
                        Item Quantity
                    </label>
                    <input
                        {...register("quentity", { required: true, valueAsNumber: true })}
                        id="quentity"
                        type="number"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    {errors.quentity && <span className="text-red-600">Quantity is required</span>}
                </div>
                <div className="mb-6">
                    <label className="block mb-2 text-sm font-bold text-gray-700">
                        Total Amount:
                    </label>
                    <span>{totalAmount}</span>
                </div>
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateForm;
