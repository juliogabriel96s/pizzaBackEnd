import { Order } from "@prisma/client"

interface CreateOrderUseCaseRequest{
    name: string
    amount: number
    pizzaId: string
}

interface CreateOrderUseCaseResponse{
    order: Order[]
}