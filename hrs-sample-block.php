<?php
/**
 * Plugin Name:       Sample WP Block
 * Description:       A sample WP Block plugin 
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       hrs-sample-block
 *
 * @package           hrs-sample-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function hrs_sample_block_init() {
	register_block_type( __DIR__ . '/build' );

	// automatically load dependencies and version
	$asset_file = include( plugin_dir_path( __FILE__ ) . 'build/index.asset.php');
	
	wp_register_script(
		'gutenberg-examples-03-esnext',
		plugins_url( 'build/index.js', __FILE__ ),
		$asset_file['dependencies'],
		$asset_file['version']
	);
}
add_action( 'init', 'hrs_sample_block_init' );
