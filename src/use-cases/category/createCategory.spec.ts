import { InMemoryCategoryRepository } from "@/repositories/inMemory/in-memory-category-repository";
import { expect, it, beforeEach, describe } from "vitest";
import { CreateCategoryUseCase } from "./createCategory";
import { NameEmpty } from "../errors/nameEmpty";

let categoryRepository: InMemoryCategoryRepository
let sut: CreateCategoryUseCase

describe('Create category', () =>{
    beforeEach(() =>{
        categoryRepository = new InMemoryCategoryRepository()
        sut = new CreateCategoryUseCase(categoryRepository)
    })

    it('Should be able to create a category', async () =>{
        const {category} = await sut.execute({
            name: 'doces'
        })

        expect(category.id).toEqual(expect.any(String))
    })

    it('should not be able to create a category without written', async () =>{
        expect(() => sut.execute({
            name : ''
        })).rejects.toBeInstanceOf(NameEmpty)
    })
})