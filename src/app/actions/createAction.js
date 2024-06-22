'use server'

import { PrismaClient } from "@prisma/client"


export const createItm = async (formDate) => {
    try {
        const prisma = new PrismaClient()
        console.log(formDate.quentity);
        const ItemData = {
            itemName: formDate.itemName,
            price: Number(formDate.price),
            quentity: Number(formDate.quentity),
            totalAmount: Number(formDate.totalAmount),
        };
        const createdItem = await prisma.item.create({ data: ItemData })
        console.log("created item :", createdItem);
    } catch (error) {
        console.log(error);

    }
}