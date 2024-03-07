import { UserRepository } from "@/repositories/userRepository"
import { User } from "@prisma/client"
import { EmailOrPasswordWrong } from "../errors/emailOrPasswordWrong"
import { compare } from "bcryptjs"

interface AuthenticateUserUseCaseRequest{
    email: string
    password: string
}

interface AuthenticateUserUseCaseResponse{
    user:User
}

export class AuthenticateUserUseCase{
    constructor(private userRepository: UserRepository){}

    async execute({
        email,
        password
    }: AuthenticateUserUseCaseRequest):Promise<AuthenticateUserUseCaseResponse>{
    
        const user = await this.userRepository.findByEmail(email)
        
        if(!user){
            throw new EmailOrPasswordWrong()
        }

        const passwordWrong = await compare(password, user.password_hash)

        if(!passwordWrong){
            throw new EmailOrPasswordWrong()
        }

        return{
            user
        }
        

    }
}