#!/bin/bash
# Testa o login e confirma que o token JWT vem na resposta.

curl -i -X POST http://localhost:3000/login \
  -H "Content-Type: application/json" \
  -d '{"email":"testehash@teste.com","senha":"123456"}'
