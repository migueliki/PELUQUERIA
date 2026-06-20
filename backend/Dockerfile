# =============================================================================
# Backend Dockerfile — Laravel + PHP 8.3 + Nginx (production, multi-stage)
# =============================================================================
# Stage 1 — Composer dependencies
FROM composer:2.7 AS composer

WORKDIR /app

COPY composer.json composer.lock ./
RUN composer install \
        --no-dev \
        --optimize-autoloader \
        --no-scripts \
        --no-interaction \
        --no-ansi

# -----------------------------------------------------------------------------
# Stage 2 — Build frontend assets with Vite
FROM node:20-alpine AS vite

WORKDIR /app

# No package-lock.json in this project, so use npm install
COPY package.json ./
RUN npm install --no-audit --no-fund

COPY vite.config.js tailwind.config.js postcss.config.js ./
COPY resources/ ./resources/

RUN npm run build

# -----------------------------------------------------------------------------
# Stage 3 — Runtime (PHP-FPM + Nginx on Alpine)
FROM php:8.3-fpm-alpine AS runtime

# System runtime libs + Nginx, then build deps for PHP extensions
RUN apk add --no-cache \
        nginx \
        libpq \
        libzip \
        libpng \
        libjpeg-turbo \
        freetype \
        libwebp \
        icu-libs \
        oniguruma \
    && apk add --no-cache --virtual .build-deps \
        libpq-dev \
        libzip-dev \
        libpng-dev \
        libjpeg-turbo-dev \
        freetype-dev \
        libwebp-dev \
        icu-dev \
        oniguruma-dev \
        $PHPIZE_DEPS \
    && docker-php-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j"$(nproc)" \
        pdo pdo_pgsql pgsql gd zip bcmath intl mbstring opcache pcntl \
    && pecl install redis \
    && docker-php-ext-enable redis \
    && apk del .build-deps \
    && rm -rf /tmp/* /var/cache/apk/*

# Production php.ini + opcache settings
RUN cp /usr/local/etc/php/php.ini-production /usr/local/etc/php/php.ini \
    && printf 'opcache.enable=1\nopcache.enable_cli=0\nopcache.memory_consumption=128\nopcache.interned_strings_buffer=16\nopcache.max_accelerated_files=10000\nopcache.validate_timestamps=0\nrealpath_cache_size=4096K\nrealpath_cache_ttl=600\nexpose_php=Off\n' \
        > /usr/local/etc/php/conf.d/zz-opcache.ini

WORKDIR /var/www/html

# App source (respect .dockerignore)
COPY --chown=www-data:www-data . .

# Vendor from composer stage (overrides any local vendor)
COPY --chown=www-data:www-data --from=composer /app/vendor ./vendor

# Built Vite assets
COPY --chown=www-data:www-data --from=vite /app/public/build ./public/build

# Writable dirs permissions
RUN chown -R www-data:www-data storage bootstrap/cache \
    && chmod -R 775 storage bootstrap/cache

# Nginx config + entrypoint
COPY docker/nginx.conf /etc/nginx/nginx.conf
COPY docker/entrypoint.sh /usr/local/bin/entrypoint.sh
# Guarantee LF line endings (Windows checkouts may use CRLF)
RUN sed -i 's/\r$//' /usr/local/bin/entrypoint.sh \
    && chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 80

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
