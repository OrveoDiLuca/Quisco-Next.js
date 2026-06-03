"use server"
import { revalidatePath } from "next/cache"
import { prisma } from "@/src/lib/prisma"

export async function completeOrder(formData : FormData) {
    const orderId = formData.get('orderId')!

    try {
        await prisma.order.updateMany({
            where:{
                id: +orderId
            },
            data:{
                status: true,
                orderReadyAt: new Date(Date.now())
            }
        })
        revalidatePath('/admin/orders')
    } catch (error) {
        console.log(error)
    }

}