<?php
/*
Plugin Name: Hello World 2
Plugin URI: https://ilimic.from.hr
Description: Test plugin which outputs hello in the admin, used for testing.
Version: 1.0
Author: Ivo Limić
Author URI: https://ilimic.from.hr
*/

namespace Ilimic\Plugins\HelloWorld2;

function hello_world() {
	echo '<p>Hello World 2</p>';
}
add_action( 'admin_notices', __NAMESPACE__ . '\hello_world' );
