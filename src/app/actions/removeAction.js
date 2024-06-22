'use server'

import { PrismaClient } from "@prisma/client"

export const removeItem = async (id)=>{

    try {
        const prisma = new PrismaClient()
        await prisma.item.delete({
            where: {id}
        })
        
    } catch (error) {
        console.log(error);
    }

}