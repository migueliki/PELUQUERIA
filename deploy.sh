#!/usr/bin/env bash
# =============================================================================
# deploy.sh — Levanta PELUQUERIA (backend Laravel + frontend Next.js) en Docker.
# Uso:  ./deploy.sh [IP_DEL_SERVIDOR]    (por defecto detecta la IP o 192.168.1.21)
# =============================================================================
set -euo pipefail

cd "$(dirname "$0")"

# ---- IP del servidor ----------------------------------------------------
SERVER_IP="${1:-$(hostname -I 2>/dev/null | awk '{print $1}')}"
SERVER_IP="${SERVER_IP:-192.168.1.21}"
echo "==> IP del servidor: ${SERVER_IP}"

# ---- 1. Parches idempotentes (por si los archivos de la VM no están fijados) ----
# 1a. .dockerignore: la línea "docker" rompe COPY docker/*. Quitar si existe.
if grep -qx 'docker' backend/.dockerignore 2>/dev/null; then
  sed -i '/^docker$/d' backend/.dockerignore
  echo "==> .dockerignore: línea 'docker' eliminada"
fi

# 1b. Dockerfile: composer:2.7 no trae ext-intl (Filament lo exige).
#     El runtime sí instala intl; ignorar platform reqs en el stage composer.
if ! grep -q -- '--ignore-platform-reqs' backend/Dockerfile 2>/dev/null; then
  sed -i 's/--no-scripts \\/--no-scripts --ignore-platform-reqs \\/' backend/Dockerfile
  echo "==> Dockerfile: añadido --ignore-platform-reqs"
fi

# ---- 2. .env ------------------------------------------------------------
if [ ! -f .env ]; then
  if [ -f .env.example ]; then
    cp .env.example .env
  else
    : > .env
  fi
  echo "==> Creado .env"
fi

set_env() {
  local key="$1" val="$2"
  if grep -q "^${key}=" .env; then
    sed -i "s|^${key}=.*|${key}=${val}|" .env
  else
    printf '%s=%s\n' "${key}" "${val}" >> .env
  fi
}

# Variables que dependen de la IP (acceso desde el navegador del cliente)
set_env APP_URL "http://${SERVER_IP}:8000"
set_env FRONTEND_URL "http://${SERVER_IP}:3000"
set_env NEXT_PUBLIC_API_BASE_URL "http://${SERVER_IP}:8000"
set_env SESSION_DOMAIN "${SERVER_IP}"

# ---- 3. APP_KEY si está vacía (generada con openssl, sin levantar contenedor) ----
CURRENT_KEY=$(grep '^APP_KEY=' .env | cut -d= -f2- || true)
if [ -z "${CURRENT_KEY}" ]; then
  KEY="base64:$(openssl rand -base64 32 | tr -d '\n')"
  set_env APP_KEY "${KEY}"
  echo "==> APP_KEY generada"
else
  echo "==> APP_KEY ya presente"
fi

# ---- 4. Build + up ------------------------------------------------------
echo "==> Construyendo y levantando contenedores (esto puede tardar) ..."
docker compose up -d --build

# ---- 5. Verificar -------------------------------------------------------
sleep 3
echo
echo "==> Estado de los contenedores:"
docker compose ps

echo
echo "================================================================"
echo "  Abre en tu navegador:"
echo "    Frontend : http://${SERVER_IP}:3000"
echo "    Backend  : http://${SERVER_IP}:8000"
echo "    Health   : http://${SERVER_IP}:8000/up   (debe devolver 'ok')"
echo "================================================================"
echo
echo "  Logs backend : docker compose logs -f backend"
echo "  Logs frontend: docker compose logs -f frontend"
echo "  Parar        : docker compose down"
echo "  Reiniciar    : docker compose restart"
