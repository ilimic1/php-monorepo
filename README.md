# php-monorepo

PoC monorepo for WordPress plugins.

We are splitting a monolithic repository to read-only standalone repositories which are published to Packagist:

- https://github.com/ilimic1/php-monorepo-wordpress-plugin-1
- https://github.com/ilimic1/php-monorepo-wordpress-plugin-2

## Getting started

1. `nvm use`
2. `npm i --prefix wp`
3. `npm run addcert --prefix wp`
4. `npm run build:wordpress --prefix wp`
5. `docker-compose up --build`
6. Visit https://wp-monorepo.test
