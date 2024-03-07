import { InMemoryUserRepository } from "@/repositories/inMemory/in-memory-user-repository";
import { expect, it, describe, beforeEach } from "vitest";
import { AuthenticateUserUseCase } from "./authenticate";
import { hash } from "bcryptjs";
import { EmailOrPasswordWrong } from "../errors/emailOrPasswordWrong";

let userRepository: InMemoryUserRepository
let sut: AuthenticateUserUseCase

describe('Authenticate user', () =>{
    beforeEach(() =>{
       userRepository = new InMemoryUserRepository()
       sut = new AuthenticateUserUseCase(userRepository)
    })

    it('Should be able to authenticate user', async() =>{
        await userRepository.create({
            name: 'john doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456',6)
        })

        const {user} = await sut.execute({
            email: 'johndoe@example.com',
            password: '123456' 
        })

        expect(user.id).toEqual(expect.any(String))
        
    })

    it('Should not be able to authenticate user with email wrong', async() =>{
        await userRepository.create({
            name: 'john doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456',6)
        })

    

        expect(() => sut.execute({
            email: 'juliogabriel@example.com',
            password: '123456' 
        }) ).rejects.toBeInstanceOf(EmailOrPasswordWrong)

        
        
    })

    it('Should not be able to authenticate user with password wrong', async() =>{
        await userRepository.create({
            name: 'john doe',
            email: 'johndoe@example.com',
            password_hash: await hash('123456',6)
        })

    

        expect(() => sut.execute({
            email: 'johndoe@example.com',
            password: '123123' 
        }) ).rejects.toBeInstanceOf(EmailOrPasswordWrong)

        
        
    })
})