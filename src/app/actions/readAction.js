'use server'
import { PrismaClient } from "@prisma/client"


export const readItem = async () => {

    try {
        const prisma = new PrismaClient()
        const itemData = await prisma.item.findMany()
        console.log(itemData);
        return itemData;

    } catch (error) {
        console.log(error);
    }

}