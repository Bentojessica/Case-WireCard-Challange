import { PaymentDataBase } from "../data/PaymentDataBase"
import { MissingFieldsToComplet } from "../Error/MissingFieldsToComplet"
import { PaymentInputDTO, PaymentInsert, TYPE } from "../Model/Payment"
import IdGenerator from "../Services/IdGenerator"

export class PaymentBusiness {
    
    async insertPayment(input: PaymentInsert) {
        
        if(!input.name || !input.email || !input.cpf || !input.amount || !input.type || !input.id_client) {
            throw new MissingFieldsToComplet()
        }

        if(!input.email.includes("@") || !input.email.includes(".com")) {
            throw new Error("Invalid email, missing @ or .com")
        }

        const paymentDataBase = new PaymentDataBase()

        if(input.type === TYPE.CREDITCARD) {
          if(!input.card_holder || !input.card_number || !input.card_expiration || !input.card_cvv) {
            throw new MissingFieldsToComplet()
           }
           
            const paymentCard: PaymentInputDTO = {
                id: IdGenerator.generate(),
                name: input.name,
                email: input.email,
                cpf: input.cpf,
                amount: input.amount,
                type: input.type,
                card_holder: input.card_holder,
                card_number: input.card_number,
                card_expiration: input.card_expiration,
                card_cvv: input.card_cvv,
                id_client: input.id_client
            }

            if(input.card_number.length > 16) {
                throw new Error("Invalid card number")
            }

            await paymentDataBase.insertPayment(paymentCard)
            const information = `Purchase made successfully, follow the purchase id for more information, https://wirecard-backend.herokuapp.com/payment/${paymentCard.id}`

           return information
        }


        if(input.type === TYPE.BANKSLIP) {
            const paymentBank: PaymentInputDTO = {
                id: IdGenerator.generate(),
                name: input.name,
                email: input.email,
                cpf: input.cpf,
                amount: input.amount,
                type: input.type,
                id_client: input.id_client
            }

            await paymentDataBase.insertPayment(paymentBank)

            const numberSlip = Math.floor(Math.random() * 6553654324755658640).toString()

            const information = `Follow the purchase id for more information, https://wirecard-backend.herokuapp.com/payment/${paymentBank.id}`
            const result = `Here's the ticket code 23427.435321.2353432.${numberSlip},       purchase processing`
           return information + result
        }

    }

    async getPaymentIdBusiness(id: string) {

        const paymentDataBase = new PaymentDataBase()
        const result = await paymentDataBase.purchaseInformationId(id)

        return result 
    }
}