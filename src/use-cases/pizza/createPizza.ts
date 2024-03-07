import { CategoryRepository } from "@/repositories/categoryRepository"
import { PizzaRepository } from "@/repositories/pizzaRepository"
import { Pizza } from "@prisma/client"
import { CategoryNotFound } from "../errors/categoryNotFound"


interface CreatePizzaUseCaseRequest{
    name: string
    price: string
    description: string,
    categoryId: string 
}

interface CreatePizzaUseCaseResponse{
    pizza: Pizza
}

export class CreatePizzaUseCase{
  constructor(
    private categoryRepository: CategoryRepository,
    private pizzaRepository: PizzaRepository
    ){}
    
    async execute({
        name,
        price,
        description,
        categoryId
    }: CreatePizzaUseCaseRequest):Promise<CreatePizzaUseCaseResponse>{
        const category = await this.categoryRepository.findById(categoryId)

        if(!category){
            throw new CategoryNotFound()
        }

        const pizza = await this.pizzaRepository.create({
            name,
            price,
            description,
            categoryId
        })

        return {
            pizza
        }
    }
}