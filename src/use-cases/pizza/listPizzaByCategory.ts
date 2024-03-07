import { PizzaRepository } from "@/repositories/pizzaRepository"
import { Pizza } from "@prisma/client"


interface ListPizzaByCategoryUseCaseRequest{
    categoryId: string
}

interface ListPizzaByCategoryUseCaseResponse{
    pizzas: Pizza[]
}

export class ListPizzaByCategoryUseCase{
    constructor(private pizzaRepository:PizzaRepository){}

    async execute({categoryId}: ListPizzaByCategoryUseCaseRequest): Promise<ListPizzaByCategoryUseCaseResponse>{
        const pizzas = await this.pizzaRepository.findMany(categoryId)

        return {
            pizzas
        }
    }
}