import { BaseDataBase } from "./BaseDataBase";

class Migrations extends BaseDataBase {

    async createTable() {
        await this.getConnection().raw(`
        create table wirecard_client(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255)
        );
        
        create table wirecard_payment(
            id VARCHAR(255) PRIMARY KEY,
            name VARCHAR(255),
            email VARCHAR(255),
            cpf VARCHAR(255),
            amount FLOAT,
            type VARCHAR(255),
            card_holder VARCHAR(255),
            card_number VARCHAR(255),
            card_expiration DATE,
            card_cvv VARCHAR(255),
            id_client VARCHAR(255),
            foreign key (id_client) references wirecard_client(id)
        );
        `)
        console.log("Table created successfully")
    }
}

const createTableMigration = new Migrations()
createTableMigration.createTable()