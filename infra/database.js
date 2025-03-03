import { Client } from 'pg';

async function query(queryObject) {
    // Configuração condicional com base no ambiente
    const clientConfig = process.env.NODE_ENV === 'production'
        ? {
            connectionString: process.env.DATABASE_URL,
            ssl: {
              rejectUnauthorized: false // Necessário para conexões SSL com Supabase
            }
          }
        : {
            // Configuração de desenvolvimento local
            host: process.env.POSTGRES_HOST,
            port: process.env.POSTGRES_PORT,
            user: process.env.POSTGRES_USER,
            database: process.env.POSTGRES_DB,
            password: process.env.POSTGRES_PASSWORD,
          };
    
    const client = new Client(clientConfig);
    
    try {
      await client.connect();
      const result = await client.query(queryObject);
      return result;
    } catch (error) {
        console.log(error);
        throw error;
    } finally {
        await client.end();
    }
}

export default {
    query: query,
};