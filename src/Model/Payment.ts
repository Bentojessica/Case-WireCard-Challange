export class Payment {
    constructor(
        private id: string,
	    private amount: number,
        private type: string,
        private card_holder: string,
        private card_number: string,
        private card_expiration: string,
        private card_cv: number,
        private id_client: string,
        private id_buyer: string
        ){}

    static paymenttModel(payment: Payment) {
        return new Payment(payment.id, payment.amount, payment.type, payment.card_holder,
            payment.card_number, payment.card_expiration, payment.card_cv, payment.id_client, payment.id_buyer)
    }
}

export enum TYPE {
    CREDITCARD = "Cartão de Crédito",
    BANKSLIP = "Boleto Bancário"
}

export type PaymentCardInsert = {
    card_holder?: string,
    card_number?: string,
    card_expiration?: string,
    card_cvv?: number 
}

export type PaymentBanckInsert = {
    amount: number,
    type: TYPE,
    id_client: string,
    id_buyer: string
}

export type PaymentInsert = {
    amount: number,
    type: TYPE,
    id_client: string,
    id_buyer: string,
    card_holder?: string,
    card_number?: string ,
    card_expiration?: string,
    card_cvv?: number 
}

export interface PaymentInputDTO extends PaymentBanckInsert, PaymentCardInsert, PaymentInsert {
    id: string
}



