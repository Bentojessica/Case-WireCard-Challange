import { BuyerDataBase } from "../data/BuyerDataBase";
import { MissingFieldsToComplet } from "../Error/MissingFieldsToComplet";
import { BuyerInputDTO, BuyerInsert } from "../Model/Buyer";
import IdGenerator from "../Services/IdGenerator";

export class BuyerBusiness {
    async insertBuyer(input: BuyerInsert) {
        
        if(!input.name || !input.email || !input.cpf || !input.id_client) {
            throw new MissingFieldsToComplet()
        }

        if(!input.email.includes("@") || !input.email.includes(".com")) {
            throw new Error("Invalid email, missing @ or .com")
        }

        if(input.cpf.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4") && input.cpf.length > 14 ){
            throw new Error("Invalid cpf, to be valid is 000.000.000-00")
        }

        const buyer: BuyerInputDTO = {
            id: IdGenerator.generate(),
            ...input
        }

        const buyerDataBase = new BuyerDataBase()
        const buyerId = await buyerDataBase.buyerFindByCpf(input.cpf)

        if(buyerId) {
            throw new Error("Buyer is already registered")
        }

        const newBuyer = await buyerDataBase.insertBuyer(buyer)

        return newBuyer
    }
}