import {Order, Prisma } from "@prisma/client";
import { OrderRepository } from "../orderRepository";
import { randomUUID } from "crypto";


export class InmemoryOrderRepository implements OrderRepository{


    public items: Order[] = []
 

    async create(data: Prisma.OrderUncheckedCreateInput) {
const order = {
    id: data.id ?? randomUUID(),
    name: data.name ?? null,
    amount: data.amount,
    pizzaId: data.pizzaId,
    created_at: new Date(),
    updated_at: new Date()
}

this.items.push(order)

return order
    }

}