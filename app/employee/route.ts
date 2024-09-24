import { NextRequest } from 'next/server'
import prisma from '../db'
import { Employee } from '@prisma/client'
export type EmployeeDTO = Employee & {
    cafe? : any
}

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query : string | null = searchParams.get('id')
    let employee : any;
    try {
        let employee : any;
        employee = await prisma.employee.findFirst({
            where: {
                id: {
                    equals: decodeURIComponent(query as string), // Exact match
                },
            },
        });
        
          return Response.json(employee);
      } catch (error) {
          return new Response(`Webhook error`, {
              status: 400,
          })
      }
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
        obj.id = generateUniqueIdentifier();
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
function generateUniqueIdentifier() {
    const prefix = 'UI';
    const length = 7; // Length of XXXXXX
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    
    let identifier = prefix;
  
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      identifier += characters[randomIndex];
    }
  
    return identifier;
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
        console.log(error)
        return new Response(`Bad Request`, {
            status: 400,
        })    
    }
}