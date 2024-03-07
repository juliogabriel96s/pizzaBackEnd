import { InMemoryUserRepository } from "@/repositories/inMemory/in-memory-user-repository";
import { RegisterUseCase } from "./registerUseCase";
import { describe, expect, it, beforeEach } from "vitest"
import { compare } from "bcryptjs";


let userRepository: InMemoryUserRepository
let sut: RegisterUseCase

describe("Register user", () =>{
    beforeEach(() =>{
        userRepository = new InMemoryUserRepository()
        sut = new RegisterUseCase(userRepository)
    })

    it('Should be able to register user', async() =>{
        const {user} = await sut.execute({
            name: 'john doe',
            email: 'johndoe@example.com',
            password: '12345'
        })

        expect(user.id).toEqual(expect.any(String))
    })

    it('Should compare password with hash', async() =>{
        const {user} = await sut.execute({
            name: 'john doe',
            email: 'johndoe@example.com',
            password: '12345'
        })

        const comparePasswordWithHash = await compare('12345', user.password_hash)

        expect(comparePasswordWithHash).toBe(true)
    })
})