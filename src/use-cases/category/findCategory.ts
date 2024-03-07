import { CategoryRepository } from "@/repositories/categoryRepository"
import { Category } from "@prisma/client"

interface FindCategoryUseCaseRequest{
    name: string
}

interface FindCategoryUseCaseResponse{
    categorys: Category[]
}

export class FindCategoryUseCase {
    constructor(private categoryRepository: CategoryRepository){}

    async execute({name}: FindCategoryUseCaseRequest):Promise<FindCategoryUseCaseResponse>{
        const categorys = await this.categoryRepository.findMany(name)

        return {
            categorys
        }
    }
}