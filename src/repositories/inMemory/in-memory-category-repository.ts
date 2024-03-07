import { Category, Prisma } from "@prisma/client";
import { CategoryRepository } from "../categoryRepository";
import { randomUUID } from "crypto";


export class InMemoryCategoryRepository implements CategoryRepository{
  
 
  
   public items: Category[] = []
   
    async create(data: Prisma.CategoryCreateInput) {
     const category ={
        id: data.id ?? randomUUID(),
        name: data.name,
        created_at: new Date(),
        updated_at: new Date()

     }

     this.items.push(category)

     return category
    }

    async findMany(name: string){

      return this.items
      .filter(item => item.name.includes(name))
   }

   async delete(category: { id: string; name: string; created_at: Date | null; updated_at: Date | null; }) {
      const itemIndex = this.items.findIndex(item => item.id === category.id)

      this.items.slice(itemIndex, 1)
   }


   async findById(id: string) {
   const category = this.items.find(item => item.id === id)

   if(!category){
      return null
   }

   return category
   }

}