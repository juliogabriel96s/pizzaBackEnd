import { InMemoryCategoryRepository } from "@/repositories/inMemory/in-memory-category-repository";
import { InMemoryPizzaRepository } from "@/repositories/inMemory/in-memory-pizza-repostory";
import { expect, it, beforeEach, describe } from "vitest";
import { CreatePizzaUseCase } from "./createPizza";
import { CategoryNotFound } from "../errors/categoryNotFound";

let categoRyRepository: InMemoryCategoryRepository
let pizzaRepository: InMemoryPizzaRepository
let sut: CreatePizzaUseCase

describe('Create pizza', () =>{
    beforeEach(async() =>{
        categoRyRepository = new InMemoryCategoryRepository()
        pizzaRepository = new InMemoryPizzaRepository()
        sut = new CreatePizzaUseCase(categoRyRepository, pizzaRepository)

        await categoRyRepository.create({
            id: 'category-01',
            name: 'doce'
        })
    })

    it('Should be able to create pizza', async () =>{
        const {pizza} = await sut.execute({
            name: 'pizza de chocolate',
            price: '10',
            description: 'Pizza de chocolate com flocos',
            categoryId: 'category-01'
        })

        expect(pizza.id).toEqual(expect.any(String))
    })

    it('Should not be able to create pizza with categoryId wrong', async () =>{
        expect(() => sut.execute({
            name: 'pizza de chocolate',
            price: '10',
            description: 'Pizza de chocolate com flocos',
            categoryId: 'category-02'
        })).rejects.toBeInstanceOf(CategoryNotFound)
    })
})