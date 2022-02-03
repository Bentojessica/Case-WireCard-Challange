import { ClientDataBase } from "../data/ClientDataBase";
import { MissingFieldsToComplet } from "../Error/MissingFieldsToComplet";
import { ClientInputDTO, ClientInsert } from "../Model/Client";
import IdGenerator from "../Services/IdGenerator";

export class ClientBusiness {
    async insertClient(input: ClientInsert) {
        
        if(!input.name || !input.cnpj || !input.address || !input.telephone) {
            throw new MissingFieldsToComplet()
        }

        if(input.cnpj.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5") && input.cnpj.length > 18){
            throw new Error("Invalid cnpj, to be valid is 00.000.000/0000-00")
        }

        const client: ClientInputDTO = {
            id: IdGenerator.generate(),
            ...input
        }

        const clientDataBase = new ClientDataBase()
        const clientCnpj = await clientDataBase.clientFindByCnpj(input.cnpj)

        if(clientCnpj) {
            throw new Error("Client is already registered")
        }

        const newClient = await clientDataBase.insertClient(client)

        return newClient
    }

    async getClientNameBusiness(name: string) {

        const clientDataBase = new ClientDataBase()
        const result = await clientDataBase.clientInformationName(name)

        return result 
    }
}