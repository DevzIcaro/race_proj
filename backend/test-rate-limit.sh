#!/bin/bash
# Testa o rate limit da rota de login.
# Dispara 7 requisições seguidas — as 5 primeiras devem processar normalmente
# (retornando 401, já que a senha usada é errada de propósito),
# a partir da 6ª deve vir 429 (limite excedido).

URL="http://localhost:3000/login"

for i in $(seq 1 7); do
  echo "--- Tentativa $i ---"
  curl -s -o /dev/null -w "Status: %{http_code}\n" \
    -X POST "$URL" \
    -H "Content-Type: application/json" \
    -d '{"email":"testehash@teste.com","senha":"senhaerrada"}'
done
