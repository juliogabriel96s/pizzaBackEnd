import { Pizza, Prisma } from "@prisma/client";
import { PizzaRepository } from "../pizzaRepository";
import { randomUUID } from "crypto";


export class InMemoryPizzaRepository implements PizzaRepository{

  
  

    public items: Pizza[] = []

    async create(data: Prisma.PizzaUncheckedCreateInput) {
     const pizza = {
        id: data.id ?? randomUUID(),
        name: data.name,
        price: data.price,
        description: data.description,
        categoryId: data.categoryId,
        created_at: new Date(),
        updated_at: new Date()
     }

     this.items.push(pizza)

     return pizza
    }

    async findMany(categoryId: string) {
        return this.items
        .filter(item => item.categoryId.includes(categoryId))
    }

    async findById(id: string) {
        const pizza = this.items.find(item => item.id === id)

        if(!pizza){
            return null
        }

        return pizza
    }

}