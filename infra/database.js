import { Client } from "pg";
import { config } from "dotenv";
config({ path: ".env.development" });

export async function getNewClient() {
  // Define a configuração do cliente com base no ambiente
  const clientConfig =
    process.env.NODE_ENV === "production" || process.env.NODE_ENV === "preview"
      ? {
          connectionString: process.env.DATABASE_URL,
          ssl: {
            rejectUnauthorized: false, // Necessário para conexões SSL com Supabase
          },
        }
      : {
          // Configuração de desenvolvimento local
          host: process.env.POSTGRES_HOST,
          port: process.env.POSTGRES_PORT,
          user: process.env.POSTGRES_USER,
          database: process.env.POSTGRES_DB,
          password: process.env.POSTGRES_PASSWORD,
        };

  // Cria uma nova instância de Client usando a configuração definida
  const client = new Client(clientConfig);
  await client.connect();
  return client;
}

export async function query(queryObject) {
  let client;
  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    await client.end();
  }
}

<<<<<<< HEAD
const database = {
  query,
  getNewClient,
};

export default database;
=======
export default {
  query,
  getNewClient,
};
>>>>>>> 31dbbbf (fix `prettier` style linting)
