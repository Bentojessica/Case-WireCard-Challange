export class Buyer {
    constructor(
        private id: string,
        private name: string,
        private email: string,
        private cpf: string,
        private id_client: SVGStringList
    ){}

    static buyerModel(buyer: Buyer) {
        return new Buyer(buyer.id, buyer.name, buyer.email, buyer.cpf, buyer.id_client)
    }
}

export interface BuyerInsert {
    name: string,
    email: string,
    cpf: string,
    id_client: string
}

export interface BuyerInputDTO extends BuyerInsert{
    id: string
} 