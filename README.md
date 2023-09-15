# php-monorepo

PoC monorepo for WordPress plugins.

We are splitting a monolithic repository to read-only standalone repositories which are published to Packagist:

- https://github.com/ilimic1/php-monorepo-wordpress-plugin-1
- https://github.com/ilimic1/php-monorepo-wordpress-plugin-2

## Getting started

1. `nvm use`
2. `npm i --prefix wp`
3. `npm run addcert --prefix wp`
4. `composer install -d wordpress-plugin-3`
5. `npm run build:wordpress --prefix wp`
6. `docker-compose up --build`
7. Visit https://wp-monorepo.test

## wordpress-plugin-3 release workflow

1. Do changes in `./wordpress-plugin-3`
2. Commit changes
3. Push to master
4. When ready to release/publish a new version, run `node publish.mjs <version>`
   - eg. `node publish.mjs <1.0.1>`
   - eg. `node publish.mjs <1.0.1-rc.1>`
5. Go to github and create a new release from the GUI, the release will be copied over to the read-only repo
