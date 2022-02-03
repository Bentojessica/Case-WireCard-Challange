import { ClientDataBase } from "../data/ClientDataBase";
import { MissingFieldsToComplet } from "../Error/MissingFieldsToComplet";
import { ClientInputDTO, ClientInsert } from "../Model/Client";
import IdGenerator from "../Services/IdGenerator";

export class ClientBusiness {
    async insertClient(input: ClientInsert) {
        
        if(!input.name) {
            throw new MissingFieldsToComplet()
        }

        const client: ClientInputDTO = {
            id: IdGenerator.generate(),
            ...input
        }

        const clientDataBase = new ClientDataBase()
        const clientName = await clientDataBase.clientFindByName(input.name)

        if(clientName) {
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