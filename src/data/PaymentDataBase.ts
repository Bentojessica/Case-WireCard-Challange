import { PaymentInputDTO, PaymentInsert } from "../Model/Payment"
import { BaseDataBase } from "./BaseDataBase"

export class PaymentDataBase extends BaseDataBase {
    
    private static TABLE_NAME = "wirecard_payment"

    async insertPayment(payment: PaymentInputDTO) {
  
        try {
            await this.getConnection()
            .insert(payment)
            .into(PaymentDataBase.TABLE_NAME)

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Unexpected database error")
            }
        }
    }

    async purchaseInformationId(id: string){
        try {
            const purchaseInformation = await this.getConnection()
            .select(["wirecard_client.name as Nome do Cliente",
            "wirecard_payment.amount as Valor", "wirecard_payment.name as Nome do Comprador", 
            "wirecard_payment.email as Email do Comprador","wirecard_payment.type as Forma de Pagamento"])
            .innerJoin("wirecard_client", "wirecard_payment.id_client", "wirecard_client.id")
            .where({"wirecard_payment.id": id})
            .from(PaymentDataBase.TABLE_NAME)
            return purchaseInformation[0]

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Unexpected database error")
            }
        }
    }
        
}
