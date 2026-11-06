"use strict";

// Nunca deixe senhas MySQL no código. Configure as variáveis no processo Node.
function obrigatoria(nome) {
  const valor = process.env[nome];
  if (typeof valor !== "string" || valor.length === 0) {
    throw new Error("Variável de ambiente obrigatória: " + nome);
  }
  return valor;
}
const db = {
  username: obrigatoria("DB_USER"),
  password: obrigatoria("DB_PASSWORD"),
  database: obrigatoria("DB_NAME"),
  host: process.env.DB_HOST || "127.0.0.1",
  port: Number(process.env.DB_PORT || 3306),
  dialect: "mysql",
  logging: false,
};
if (!Number.isInteger(db.port) || db.port < 1 || db.port > 65535) {
  throw new Error("DB_PORT deve ser uma porta TCP válida.");
}
module.exports = {
  development: { ...db },
  test: { ...db },
  production: { ...db },
};
