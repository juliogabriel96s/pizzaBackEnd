import { InMemoryPizzaRepository } from "@/repositories/inMemory/in-memory-pizza-repostory";
import { expect, describe, it, beforeEach } from "vitest";
import { ListPizzaByCategoryUseCase } from "./listPizzaByCategory";

let pizzaRepository: InMemoryPizzaRepository
let sut: ListPizzaByCategoryUseCase

describe('List pizza by category', () =>{
    beforeEach(async() =>{
        pizzaRepository = new InMemoryPizzaRepository()
        sut = new ListPizzaByCategoryUseCase(pizzaRepository)
    })

    it('Should be able to list a pizza by category', async () =>{
        await pizzaRepository.create({
            name: 'pizza de chocolate',
            price: '10',
            description: 'Pizza de chocolate com flocos',
            categoryId: 'category-01'
        })

        const {pizzas} =  await sut.execute({
            categoryId: 'category-01'
        })

        expect(pizzas).toHaveLength(1)
        expect(pizzas).toEqual([
            expect.objectContaining({
            name: 'pizza de chocolate'
            })
        ])
    })
})