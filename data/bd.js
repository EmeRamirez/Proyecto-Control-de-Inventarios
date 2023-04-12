import pg from 'pg'
const {Pool} = pg

const pool = new Pool ({
    user: 'postgres',
    password: '1234',
    host: 'localhost',
    port: 5432,
    database: 'nombre de la base de datos'
});

export default pool;