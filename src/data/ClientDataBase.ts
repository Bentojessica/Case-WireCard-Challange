import { ClientInputDTO, ClientInsert } from "../Model/Client";
import { BaseDataBase } from "./BaseDataBase";

export class ClientDataBase extends BaseDataBase {
    
    private static TABLE_NAME = "wirecard_client"

    async insertClient(client: ClientInsert) {
        try {
            await this.getConnection()
            .insert(client)
            .into(ClientDataBase.TABLE_NAME)

            return "Successfully"
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Unexpected database error")
            }
        }
    }

    async clientFindByCnpj(cnpj: string): Promise<ClientInputDTO>{
        try {
            const client = await this.getConnection()
            .select("*")
            .where({cnpj: cnpj})
            .from(ClientDataBase.TABLE_NAME)

            return client[0]

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Unexpected database error")
            }
        }
    }

    async clientInformationName(name: string){
        try {
            const clientInformation = await this.getConnection()
            .select(["wirecard_client.id as Id", "wirecard_client.name as Nome do Cliente", "wirecard_client.cnpj as Cnpj",
            "wirecard_client.address as Endereço", "wirecard_client.telephone as Telefone"])
            .where({"wirecard_client.name": name})
            .from(ClientDataBase.TABLE_NAME)

            return clientInformation[0]

        } catch (error) {
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Unexpected database error")
            }
        }
    }

}