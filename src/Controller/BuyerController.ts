import { Request, Response } from "express"
import { BuyerBusiness } from "../Business/BuyerBusiness"
import { BuyerInsert } from "../Model/Buyer"

export class BuyerController {

    async createBuyer(req: Request, res: Response) {
        try {
            const { name, email, cpf, id_client } = req.body

            const input: BuyerInsert = {
                name,
                email,
                cpf,
                id_client
            }

            const buyerBusiness = new BuyerBusiness()
            const buyerMessage = await buyerBusiness.insertBuyer(input)

            res.status(200).send({buyerMessage})

        } catch (error) {
            if(error instanceof Error) {
                res.status(400).json({message: error.message})
            }else {
                res.status(400).json({message: "Unexpected Error"})
            }
        }
    }
}