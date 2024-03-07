import { UserRepository } from "@/repositories/userRepository"
import { User } from "@prisma/client"
import { hash } from "bcryptjs"
import { UserAlreadyExist } from "../errors/userAlreadyExists"

interface RegisterUseCaseRequest{
    name: string
    email: string
    password: string
}

interface RegisterUseCaseResponse{
    user: User
}

export class RegisterUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({
        name,
        email,
        password
    }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse>{
        const password_hash = await hash(password, 6)

        const userWithSameEmail = await this.userRepository.findByEmail(email)

        if(userWithSameEmail){
            throw new UserAlreadyExist()
        }

        const user = await this.userRepository.create({
            name,
            email,
            password_hash
        })

        return{
            user
        }
    }
}