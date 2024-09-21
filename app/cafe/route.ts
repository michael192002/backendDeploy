import { NextRequest } from 'next/server'
import prisma from '../db'
import { Cafe } from '@prisma/client'
export type CafeDTO = Cafe & {
    employees? : any
}
export async function POST(request: NextRequest) {
    try {
        const obj : Cafe = await request.json()
        await prisma.cafe.create({
            data : obj
        });
        return Response.json(obj);
    } catch (error) {
        return new Response(`Bad Request`, {
            status: 400,
        })    
    }
}

export async function PUT(request: NextRequest) {
    try {
        const obj : Cafe = await request.json()
        await prisma.cafe.update({
            where: {
                id: obj.id,
            },
            data : obj
        });
        return Response.json(obj);
    } catch (error) {
        return new Response(`Bad Request`, {
            status: 400,
        })    
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const cafeId : string = (await request.json()).cafeId;
        const deleteEmployees = prisma.employee.deleteMany({
            where: {
              cafeId: cafeId,
            },
        })
        const deleteCafe = prisma.cafe.delete({
            where: {
              id: cafeId,
            },
        })
        const transaction = await prisma.$transaction([deleteEmployees, deleteCafe])
        return new Response('Success!', {
            status: 200,
        });
    } catch (error) {
        return new Response(`Bad Request`, {
            status: 400,
        })    
    }
}