'use client'


import { createItm } from '@/app/actions/createAction';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';

const NewForm = ({setRefrash,refrash}) => {

    const { register, handleSubmit, formState: { errors }, watch,reset } = useForm();
    const [totalAmount, setTotalAmount] = useState(0);

    // Watch for changes in price and quantity using react-hook-form's watch function
    const price = watch('price', 0);
    const quentity = watch('quentity', 0);

    // Update total amount whenever price or quantity changes
    useEffect(() => {
        const totalPrice = parseFloat(price) * parseInt(quentity);
        setTotalAmount(isNaN(totalPrice) ? 0 : totalPrice);
    }, [price, quentity]);

    const onSubmit = async (data) => {
        // Handle form submission here
        const newFormData = {...data, totalAmount}
      await createItm(newFormData);
      setRefrash(!refrash)
      reset();
      // console.log(newFormData);
    };

    return (
        <div className="w-full h-full">
            <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
                <div className="mb-4">
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="itemName">
                        Item Name
                    </label>
                    <input {...register("itemName")} id="itemName" type="text" className="w-full px-3 py-2 border rounded-md" />
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
                    <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="quantity">
                        Item Quantity
                    </label>
                    <input
                        {...register("quentity", { required: true, valueAsNumber: true })}
                        id="quentity"
                        type="number"
                        className="w-full px-3 py-2 border rounded-md"
                    />
                    {errors.quantity && <span className="text-red-600">Quantity is required</span>}
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
                        className="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline"
                    >
                        Save
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewForm;
