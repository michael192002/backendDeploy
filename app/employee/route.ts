import { NextRequest } from 'next/server'
import prisma from '../db'
import { Employee } from '@prisma/client'
export type EmployeeDTO = Employee & {
    cafe? : any
}

export async function POST(request: NextRequest) {
    try {
        const obj : EmployeeDTO = await request.json()
        obj.start = new Date();
        if (obj.cafeId) {
            obj.cafe = {
              connect: {
                id: obj.cafeId, // Ensure this is a valid UUID
              },
            };
            delete (obj as any).cafeId;
        }
        await prisma.employee.create({
            data: obj 
        })
        return Response.json(obj);
    } catch (error) {
        console.log(error)
        return new Response(`Bad Request` , {
            status: 400,
        })    
    }
}

export async function PUT(request: NextRequest) {
    try {
        const obj : EmployeeDTO = await request.json();
        if (obj.cafeId) {
            const cafeId = await prisma.employee.findFirst({
                where : {
                    id : obj.id
                },
                select : {
                    cafeId : true
                }
            })
            if (cafeId?.cafeId && (cafeId?.cafeId != obj.cafeId)) {
                obj.start = new Date();
            }
            obj.cafe = {
                connect: {
                    id: obj.cafeId, // Ensure this is a valid UUID
                },
            };
           delete (obj as any).cafeId
        }
        await prisma.employee.update({
            where: {
                id: obj.id,
            },
            data : obj
        });
        return Response.json(obj);
    } catch (error) {
        console.log(error)
        return new Response(`Bad Request`, {
            status: 400,
        })    
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const employeeId : string = (await request.json()).employeeId;
        const deleteEmployees = await prisma.employee.delete({
            where: {
              id: employeeId,
            },
        })
        return new Response('Success!', {
            status: 200,
        });
    } catch (error) {
        return new Response(`Bad Request`, {
            status: 400,
        })    
    }
}