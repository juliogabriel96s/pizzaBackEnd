import { Pizza, Prisma } from "@prisma/client";


export interface PizzaRepository{
    create(data: Prisma.PizzaUncheckedCreateInput): Promise<Pizza>
    findMany(categoryId: string): Promise<Pizza[]>
    findById(id: string): Promise<Pizza | null>
}