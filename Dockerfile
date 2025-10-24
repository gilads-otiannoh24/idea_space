# --------------------------
# Stage 1: Build App (PHP + Node)
# --------------------------
FROM php:8.4-cli-alpine AS build

# Install system dependencies for PHP + Node
RUN apk add --no-cache \
    nodejs \
    npm \
    git \
    curl \
    icu-dev \
    zip \
    unzip \
    libzip-dev

# Install PHP extensions required by Tempest
RUN docker-php-ext-install intl zip pdo pdo_mysql

# Install Composer from the official image
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Set working directory
WORKDIR /app

# Copy Composer files and install PHP dependencies
COPY composer.json composer.lock ./

# Copy app source before running discovery
COPY app ./app

RUN composer install --no-dev --optimize-autoloader

RUN chown -R www-data:www-data /var/www

# Install PNPM globally
RUN npm install -g pnpm

# Copy JS dependency files and install frontend dependencies
COPY pnpm-lock.yaml package.json ./
RUN pnpm install --frozen-lockfile

# Copy the entire project
COPY . .

# Build frontend (this will now work because PHP + Tempest are available)
RUN pnpm run build

# --------------------------
# Stage 2: Runtime
# --------------------------
FROM php:8.4-fpm-alpine AS runtime

# Install system dependencies
RUN apk add --no-cache \
    nginx \
    supervisor \
    icu-dev \
    zip \
    unzip \
    libzip-dev \
    git \
    curl

# Install required PHP extensions
RUN docker-php-ext-install intl zip pdo pdo_mysql

# Set working directory
WORKDIR /var/www

# Copy Composer from previous stage (optional)
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# Copy built PHP app and frontend from build stage
COPY --from=build /app /var/www

# Copy configs
COPY ./docker/nginx.conf /etc/nginx/nginx.conf
COPY ./docker/supervisord.conf /etc/supervisord.conf

EXPOSE 8080

# Start Supervisor (manages PHP-FPM + Nginx)
CMD ["/usr/bin/supervisord", "-c", "/etc/supervisord.conf"]
