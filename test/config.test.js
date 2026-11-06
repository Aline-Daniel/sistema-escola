"use strict";
const { test } = require("node:test");
const assert = require("node:assert/strict");

const arquivo = require.resolve("../database/config/config");
function executar(variaveis, callback) {
  const keys = ["DB_USER", "DB_PASSWORD", "DB_NAME", "DB_HOST", "DB_PORT"];
  const originais = Object.fromEntries(keys.map(k => [k, process.env[k]]));
  try {
    for (const k of keys) delete process.env[k];
    Object.assign(process.env, variaveis);
    delete require.cache[arquivo];
    return callback();
  } finally {
    for (const k of keys) {
      if (originais[k] === undefined) delete process.env[k];
      else process.env[k] = originais[k];
    }
    delete require.cache[arquivo];
  }
}
test("recusa acesso sem credenciais", () => {
  executar({}, () => assert.throws(() => require(arquivo), /DB_USER/));
  executar({ DB_USER: "teste" }, () => assert.throws(() => require(arquivo), /DB_PASSWORD/));
  executar({ DB_USER: "teste", DB_PASSWORD: "teste" }, () => assert.throws(() => require(arquivo), /DB_NAME/));
});
test("usa o ambiente nas três configurações sem senha fixa", () => {
  executar({ DB_USER: "teste", DB_PASSWORD: "senha-de-teste", DB_NAME: "escola_teste", DB_PORT: "3307" }, () => {
    const configuracoes = require(arquivo);
    for (const modo of ["development", "test", "production"]) {
      assert.equal(configuracoes[modo].username, "teste");
      assert.equal(configuracoes[modo].password, "senha-de-teste");
      assert.equal(configuracoes[modo].database, "escola_teste");
      assert.equal(configuracoes[modo].port, 3307);
      assert.equal(configuracoes[modo].dialect, "mysql");
    }
  });
});
test("bloqueia porta inválida", () => {
  executar({ DB_USER: "teste", DB_PASSWORD: "teste", DB_NAME: "escola", DB_PORT: "n/a" }, () => {
    assert.throws(() => require(arquivo), /DB_PORT/);
  });
});
