<?php
/*
Plugin Name: Hello World 3
Plugin URI: https://ilimic.from.hr
Description: Test plugin which outputs hello in the admin, used for testing.
Version: 1.0.13
Author: Ivo Limić
Author URI: https://ilimic.from.hr
*/

namespace Ilimic\Plugins\HelloWorld2;

use YahnisElsts\PluginUpdateChecker\v5\PucFactory;

require_once __DIR__ . '/vendor/autoload.php';

$myUpdateChecker = PucFactory::buildUpdateChecker(
	'https://github.com/ilimic1/php-monorepo-wordpress-plugin-3',
	__FILE__, //Full path to the main plugin file or functions.php.
	'ilimic/hello-world-3'
);

$myUpdateChecker->getVcsApi()->enableReleaseAssets();

function hello_world() {
	echo '<p>Hello World 3</p>';
}
add_action( 'admin_notices', __NAMESPACE__ . '\hello_world' );
