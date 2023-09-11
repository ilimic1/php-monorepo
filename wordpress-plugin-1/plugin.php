<?php
/*
Plugin Name: Hello World 1
Plugin URI: https://ilimic.from.hr
Description: Dummy plugin which outputs hello in the admin, used for testing.
Version: 1.0
Author: Ivo Limić
Author URI: https://ilimic.from.hr
*/

namespace Ilimic\Plugins\HelloWorld1;

function hello_world() {
	echo '<p>Hello World 1</p>';
}
add_action( 'admin_notices', __NAMESPACE__ . '\hello_world' );
