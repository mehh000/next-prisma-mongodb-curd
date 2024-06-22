'use server'

import { PrismaClient } from "@prisma/client"

export const updateItem = async ({ id }, newFormData) => {
    console.log('my id', id);
    console.log('my data', newFormData);

    try {
        const prisma = new PrismaClient()
        const ItemData = {
            itemName: newFormData.itemName,
            price: Number(newFormData.price),
            quentity: Number(newFormData.quentity),
            totalAmount: Number(newFormData.totalAmount),
        }
        await prisma.item.update({
            where: { id },
            data: { ...ItemData },
        })

    } catch (error) {
        console.log(error);
    }

}

export const findForUpdate = async (id ) => {

    try {
        console.log(id);
        const prisma = new PrismaClient()
        const itemData = await prisma.item.findUnique({
            where: {id}
        })
        console.log(itemData);
        return itemData;

    } catch (error) {
        console.log(error);
    }

}