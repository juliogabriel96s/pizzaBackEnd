import { Category, Prisma } from "@prisma/client";


export interface CategoryRepository{
    create(data: Prisma.CategoryCreateInput): Promise<Category>
    findMany(name: string): Promise<Category[]>
    delete(category: Category): Promise<void>
    findById(id: string): Promise<Category | null>
}