import {PoolOptions} from "mysql2";

export const databaseConfiguration: PoolOptions = {
    host: 'localhost',
    port: 1406,
    user: 'root',
    password: 'root',
    database: 'chat'
}
