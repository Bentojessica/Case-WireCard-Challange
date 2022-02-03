export class Payment {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private cpf: string,
	    private amount: number,
        private type: string,
        private card_holder: string,
        private card_number: string,
        private card_expiration: string,
        private card_cvv: string,
        private id_client: string,
        private id_buyer: string
        ){}

    static paymenttModel(payment: Payment) {
        return new Payment(payment.id,payment.name, payment.email, payment.cpf, payment.amount, payment.type, 
            payment.card_holder, payment.card_number, payment.card_expiration, payment.card_cvv, payment.id_client, payment.id_buyer)
    }
}

export enum TYPE {
    CREDITCARD = "Cartão de Crédito",
    BANKSLIP = "Boleto Bancário"
}


export type PaymentInsert = {
    name: string,
    email: string,
    cpf: string,
    amount: number,
    type: TYPE,
    card_holder?: string,
    card_number?: string ,
    card_expiration?: string,
    card_cvv?:  string,
    id_client: string,
}

export interface PaymentInputDTO extends PaymentInsert{
    id: string
}



