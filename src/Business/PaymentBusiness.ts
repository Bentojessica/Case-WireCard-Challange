import { PaymentDataBase } from "../data/PaymentDataBase"
import { MissingFieldsToComplet } from "../Error/MissingFieldsToComplet"
import { PaymentInputDTO, PaymentInsert, TYPE } from "../Model/Payment"
import IdGenerator from "../Services/IdGenerator"

export class PaymentBusiness {
    
    async insertPayment(input: PaymentInsert) {
        
        if(!input.amount || !input.type || !input.id_client || !input.id_buyer) {
            throw new MissingFieldsToComplet()
        }

        const paymentDataBase = new PaymentDataBase()
        const numberSlip = Math.floor(Math.random() * 6553654324755658640).toString()

        if(input.type === TYPE.CREDITCARD) {

          if(!input.card_holder || !input.card_number || !input.card_expiration || !input.card_cvv) {
            throw new MissingFieldsToComplet()
           }
            const paymentCard: PaymentInputDTO = {
                id: IdGenerator.generate(),
                amount: input.amount,
                type: input.type,
                card_holder: input.card_holder,
                card_number: input.card_number,
                card_expiration: input.card_expiration,
                card_cvv: input.card_cvv,
                id_client: input.id_client,
                id_buyer: input.id_buyer
            }

            if(input.card_number.toString().length > 16) {
                throw new Error("Invalid card number")
            }

            if(input.card_cvv.toString().length > 3) {
                throw new Error("The card_cvv has only 3 numbers")
            }

            await paymentDataBase.insertPayment(paymentCard)

           return `Purchase made successfully, we send more information about the purchase by 
           e-mail, code of the purchase made is ${numberSlip}`
        }


        if(input.type === TYPE.BANKSLIP) {
            const paymentBank: PaymentInputDTO = {
                id: IdGenerator.generate(),
                amount: input.amount,
                type: input.type,
                id_client: input.id_client,
                id_buyer: input.id_buyer
            }

            await paymentDataBase.insertPayment(paymentBank)
            
           return "Purchase made successfully, we'll send you more information about the purchase by email, follow the bank slip number " + (`23427.435321.2353432.${numberSlip}`)
        }

    }

    async getPaymentIdBusiness(id: string) {

        const paymentDataBase = new PaymentDataBase()
        const result = await paymentDataBase.purchaseInformationId(id)

        return result 
    }
}