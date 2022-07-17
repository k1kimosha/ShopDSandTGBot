import { createPool } from "mysql2";
import "dotenv/config";

class Mysql {
    pool;

    async execute(sql, data) {
        try {
            const [result] = await this.pool.query(sql, data);
            return result;
        } catch (error) {
            console.log(error);
        } 
    }

    async init(options) {
        this.pool = createPool(options).promise();
    };

}

const sqlConnection = new Mysql();

sqlConnection.init({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
});

export {
    sqlConnection
};