export class Client {
    constructor(
        private id: string,
        private name: string,
        private cnpj: string,
        private address: string,
        private telephone: string
    ){}

    static clientModel(client: Client) {
        return new Client(client.id, client.name, client.cnpj, client.address, client.telephone)
    }
}

export interface ClientInsert {
     name: string,
     cnpj: string,
     address: string,
     telephone: string
}

export interface ClientInputDTO extends ClientInsert {
    id: string
} 