import { Request, Response } from "express";
import { ClientBusiness } from "../Business/ClientBusiness";
import { ClientInsert } from "../Model/Client";

export class ClientController {

    async createClient(req: Request, res: Response) {
        try {
            const { name } = req.body

            const input: ClientInsert = {
                name
            }

            const clientBusiness = new ClientBusiness()
            const clientMessage = await clientBusiness.insertClient(input)

            res.status(200).send({clientMessage})

        } catch (error) {
            if(error instanceof Error) {
                res.status(400).json({message: error.message})
            }else {
                res.status(400).json({message: "Unexpected Error"})
            }
        }
    }

    async getClientName(req: Request, res: Response) {
        try {

            const { name } = req.params
            
            const clientBusiness = new ClientBusiness()
            const result = await clientBusiness.getClientNameBusiness(name)

            res.status(200).send(result)
        } catch (error) {
            if (error instanceof Error) {
                res.status(400).json({message: error.message})
            } else {
                res.status(400).send({message: "Unexpected Error"})
            }
        }
    }
}