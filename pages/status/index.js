import useSWR from "swr";

async function fetchAPI(key) {
  const response = await fetch(key);
  const responseBody = await response.json();
  return responseBody;
}

export default function StatusPage() {
  return (
    <>
      <h1> Status </h1>
      <UpdatedAt />
      <h1>Database</h1>
      <DatabaseVersion />
      <DatabaseMaxConnections />
      <DatabaseOpenedConnections />
    </>
  );
}

function UpdatedAt() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let updatedAtText = "Carregando...";
  if (!isLoading && data) {
    updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
  }
  return <div>Última atualização: {updatedAtText}</div>;
}

function DatabaseVersion() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI);
  let databaseVersionText = "Carregando...";
  if (!isLoading && data) {
    databaseVersionText = data.dependencies.database.version;
  }
  return <div>Versão: {databaseVersionText}</div>;
}

function DatabaseMaxConnections() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI);
  let databaseMaxConnectionsText = "Carregando...";
  if (!isLoading && data) {
    databaseMaxConnectionsText = data.dependencies.database.max_connections;
  }
  return <div>Máximo de conexões: {databaseMaxConnectionsText}</div>;
}

function DatabaseOpenedConnections() {
  const { isLoading, data } = useSWR("/api/v1/status", fetchAPI, {
    refreshInterval: 2000,
  });
  let databaseOpenedConnectionsText = "Carregando...";
  if (!isLoading && data) {
    databaseOpenedConnectionsText =
      data.dependencies.database.opened_connections;
  }
  return <div>Conexões abertas: {databaseOpenedConnectionsText}</div>;
}
