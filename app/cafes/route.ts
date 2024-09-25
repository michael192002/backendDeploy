import { NextRequest } from 'next/server'
import prisma from '../db'
import { CafeDTO } from '../cafe/route'
export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const query : string | null = searchParams.get('location')
    let cafes : CafeDTO[] = [];
    try {
          if (query) {
              cafes = await prisma.cafe.findMany({
                  where: {
                      location: {
                          equals: decodeURIComponent(query as string), // Exact match
                      },
                  },
                  include: {
                      employees: {
                      select: {
                          id: true, // Select only the employee ID (or any other field if needed)
                      },
                      },
                  },
              });
          } else {
              cafes = await prisma.cafe.findMany({
                  include: {
                      employees: {
                      select: {
                          id: true, // Select only the employee ID (or any other field if needed)
                      },
                      },
                  },
              });
          }
          let responseDTO = cafes.map(cafe => ({...cafe, employees : cafe?.employees?.length}))
          responseDTO = responseDTO.sort((x,y) => y.employees - x.employees);
          return Response.json(responseDTO);
      } catch (error) {
          console.log(error)
          return new Response(`Webhook error`, {
              status: 400,
          })
      }
  }
  