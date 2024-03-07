import { InMemoryCategoryRepository } from "@/repositories/inMemory/in-memory-category-repository";
import { expect, it, describe, beforeEach } from "vitest";
import { FindCategoryUseCase } from "./findCategory";

let categoryRepository: InMemoryCategoryRepository
let sut: FindCategoryUseCase

describe('Find a category', () =>{
    beforeEach(() =>{
        categoryRepository = new InMemoryCategoryRepository()
        sut = new FindCategoryUseCase(categoryRepository)
    })

    it('Should be able to find a category', async() =>{
        await categoryRepository.create({
            name: 'doce'
        })

        await categoryRepository.create({
            name: 'vegana'
        })

        const {categorys} = await sut.execute({
            name: 'doce'
        })

        expect(categorys).toHaveLength(1)
        expect(categorys).toEqual([
            expect.objectContaining({name: 'doce'})
        ])
    })
})