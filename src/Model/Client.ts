export class Client {
    constructor(
        private id: string,
        private name: string
    ){}

    static clientModel(client: Client) {
        return new Client(client.id, client.name)
    }
}

export interface ClientInsert {
     name: string
}

export interface ClientInputDTO extends ClientInsert {
    id: string
} 