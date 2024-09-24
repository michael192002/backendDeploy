import { NextRequest } from 'next/server'
import prisma from '../db'
import { EmployeeDTO } from '../employee/route'
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query : string | null = searchParams.get('cafe')
    let employees : EmployeeDTO[] = [];
    try {
      if (query) {
          employees = await prisma.employee.findMany({
              where: {
                  cafe: {
                  name: {
                      equals: decodeURIComponent(query as string),
                  },
                  },
              },
              include: {
                  cafe: {
                  select: {
                      name: true, // Fetch cafe name
                  },
                  },
              },
          });
      } else {
          employees = await prisma.employee.findMany({
              include: {
                  cafe: {
                  select: {
                      name: true, // Fetch cafe name
                  },
                  },
              },
          });
    }
    let responseDTO = employees.map(employee => ({
          id : employee.id,
          name  : employee.name,
          email_address : employee.email_address,
          phone_number : employee.phone_number,
          days_worked :  employee.start ? Math.floor((Date.now() - new Date(employee.start).getTime()) / (1000 * 60 * 60 * 24)) : null,
          cafe : employee.cafe.name,
    }))
    responseDTO = responseDTO.sort((x, y) => {
        const xDays = x.days_worked || 0;
        const yDays = y.days_worked || 0;
        return yDays - xDays;
      });    
    return Response.json(responseDTO);
   } catch (error) {
      console.log(error);
      return new Response(`Internal Server Error`, {
          status: 500,
      }) 
    }
  }