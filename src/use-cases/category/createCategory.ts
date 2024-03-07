import { CategoryRepository } from "@/repositories/categoryRepository"
import { Category } from "@prisma/client"
import { NameEmpty } from "../errors/nameEmpty"

interface CreateCategoryUseCaseRequest{
    name: string
}

interface CreateCategoryUseCaseResponse{
    category: Category
}

export class CreateCategoryUseCase{
    constructor(private categoryRepository: CategoryRepository){}

    async execute({name}: CreateCategoryUseCaseRequest): Promise<CreateCategoryUseCaseResponse>{
        if(name === ''){
            throw new NameEmpty()
        }
        
        const category = await this.categoryRepository.create({name})

        return{
            category
        }
    }
}