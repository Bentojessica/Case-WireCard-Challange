import { Request, Response } from "express";
import { PaymentBusiness } from "../Business/PaymentBusiness";
import {  PaymentInsert } from "../Model/Payment";

export class PaymentController {

    async createPayment(req: Request, res: Response) {
        try {
            const {
                name, email, cpf, amount, type, card_holder, card_number,
                card_expiration, card_cvv, id_client
            } = req.body
            
            const input: PaymentInsert= {
                name,
                email,
                cpf,
                amount,
                type,
                card_holder,
                card_number,
                card_expiration,
                card_cvv,
                id_client
            }

            const paymentBusiness = new PaymentBusiness()
            const paymentMessage = await paymentBusiness.insertPayment(input)
            
        
            res.status(200).send({paymentMessage})
            
        } catch (error) {
            if(error instanceof Error) {
                res.status(400).json({message: error.message})
            }else {
                res.status(400).json({message: "Unexpected Error"})
            }
        }
    }

    async getPaymentId(req: Request, res: Response) {
        try {

            const { id } = req.params
            
            const paymentBusiness = new PaymentBusiness()
            const result = await paymentBusiness.getPaymentIdBusiness(id)

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