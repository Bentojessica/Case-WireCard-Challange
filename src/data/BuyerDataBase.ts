import { BuyerInputDTO, BuyerInsert } from "../Model/Buyer";
import { BaseDataBase } from "./BaseDataBase";

export class BuyerDataBase extends BaseDataBase {
    
    private static TABLE_NAME = "wirecard_buyer"

    async insertBuyer(buyer: BuyerInsert) {
        try {
            await this.getConnection()
            .insert(buyer)
            .into(BuyerDataBase.TABLE_NAME)

            return "Successfully"
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Unexpected database error")
            }
        }
    }

    async buyerFindByCpf(cpf: string){
        try {
            const buyer = await this.getConnection()
            .select("*")
            .where({cpf: cpf})
            .from(BuyerDataBase.TABLE_NAME)

            return buyer[0]

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Unexpected database error")
            }
        }
    }

    async buyerInformationName(name: string){
        try {
            const buyerInformation = await this.getConnection()
            .select(["wirecard_buyer.id as Id","wirecard_buyer.name as Nome do Comprador", 
            "wirecard_buyer.email as Email do Comprador"])
            .where({"wirecard_buyer.name": name})
            .from(BuyerDataBase.TABLE_NAME)
        
            return buyerInformation[0]

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Unexpected database error")
            }
        }
    }

}