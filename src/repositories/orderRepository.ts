import { Order, Prisma } from "@prisma/client";

export interface OrderRepository{
    create(data: Prisma.OrderUncheckedCreateInput):Promise<Order>
}