#!/bin/sh
set -e

DB_HOST="${DB_HOST:-db}"
DB_PORT="${DB_PORT:-5432}"
REDIS_HOST="${REDIS_HOST:-redis}"
REDIS_PORT="${REDIS_PORT:-6379}"

# -----------------------------------------------------------------------------
# Wait for dependencies (fatal: without DB/Redis the app cannot work)
# -----------------------------------------------------------------------------
echo "[entrypoint] Waiting for DB ${DB_HOST}:${DB_PORT} ..."
i=0
until nc -z -w2 "${DB_HOST}" "${DB_PORT}"; do
  i=$((i + 1))
  if [ "${i}" -ge 30 ]; then
    echo "[entrypoint] ERROR: DB not reachable after 60s" >&2
    exit 1
  fi
  echo "[entrypoint] DB not ready, retry in 2s ..."
  sleep 2
done

echo "[entrypoint] Waiting for Redis ${REDIS_HOST}:${REDIS_PORT} ..."
i=0
until nc -z -w2 "${REDIS_HOST}" "${REDIS_PORT}"; do
  i=$((i + 1))
  if [ "${i}" -ge 30 ]; then
    echo "[entrypoint] ERROR: Redis not reachable after 60s" >&2
    exit 1
  fi
  echo "[entrypoint] Redis not ready, retry in 2s ..."
  sleep 2
done

# -----------------------------------------------------------------------------
# Ensure writable directories exist (in case storage is a mounted volume)
# -----------------------------------------------------------------------------
echo "[entrypoint] Preparing storage directories ..."
mkdir -p \
  storage/framework/cache/data \
  storage/framework/sessions \
  storage/framework/views \
  storage/logs \
  storage/app/public \
  storage/app/private \
  bootstrap/cache

echo "[entrypoint] Fixing permissions ..."
chown -R www-data:www-data storage bootstrap/cache
chmod -R 775 storage bootstrap/cache

# -----------------------------------------------------------------------------
# Artisan tasks (non-fatal: keep the container up even if one step warns)
# -----------------------------------------------------------------------------
run_artisan() {
  echo "[entrypoint] > php artisan $*"
  php artisan "$@" || echo "[entrypoint] WARNING: 'php artisan $*' failed (continuing)"
}

run_artisan storage:link
run_artisan filament:upgrade
run_artisan config:cache
run_artisan route:cache
run_artisan view:cache
run_artisan migrate --force

# -----------------------------------------------------------------------------
# Launch PHP-FPM (daemon) + Nginx (foreground so the container stays up)
# -----------------------------------------------------------------------------
echo "[entrypoint] Starting PHP-FPM + Nginx ..."
php-fpm -D
exec nginx -g 'daemon off;'
