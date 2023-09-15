<?php
/*
Plugin Name: Hello World 1
Plugin URI: https://ilimic.from.hr
Description: Test plugin which outputs hello in the admin, used for testing.
Version: 1.0.14-rc.1
Author: Ivo Limić
Author URI: https://ilimic.from.hr
*/

namespace Ilimic\Plugins\HelloWorld1;

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

require_once __DIR__ . '/vendor/autoload.php';

$myUpdateChecker = PucFactory::buildUpdateChecker(
	'https://github.com/ilimic1/php-monorepo-wordpress-plugin-1',
	__FILE__, //Full path to the main plugin file or functions.php.
	'ilimic/hello-world-1'
);

function hello_world() {
	echo '<p>Hello World 1</p>';
}
add_action( 'admin_notices', __NAMESPACE__ . '\hello_world' );
