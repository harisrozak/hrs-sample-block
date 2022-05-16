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
 * Render callback with server-side processing using 'render_callback' attribute 
 * instead of client side scripting using save.js
 */
function render_hrs_sample_block( $attributes, $content ) {
	$wrapper_attributes = get_block_wrapper_attributes();
	$post_list          = get_posts( array(
		'post_type'      => $attributes['post_type'],
		'posts_per_page' => $attributes['posts_count']
	) );

	ob_start();
	?>

	<div <?php echo $wrapper_attributes ?>>
		<div
			style="<?php printf( 
				'text-align:%s;padding:0 %2$spx 0 %2$spx',
				$attributes['alignment'], $attributes['padding']
			) ?>"
		>
			<h2><?php echo esc_html( $attributes['content_title'] ) ?></h2>
			<p><?php echo wp_kses_post( $attributes['content'] ) ?></p>
			
			<ul>
				<?php if ( $post_list ) : ?>
					<?php foreach ( $post_list as $post ) : ?>
						<li><a href="<?php echo get_the_permalink( $post->ID ); ?>"><?php echo esc_html( $post->post_title ) ?></a></li>
					<?php endforeach; ?>
				<?php endif; ?>			
			</ul>

			<h4><?php echo esc_html( $attributes['content_footer'] ) ?></h4>
		</div>
	</div>

	<?php
	$content = ob_get_clean();

	return $content;
}

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/reference/functions/register_block_type/
 */
function hrs_sample_block_init() {
	register_block_type( 
		__DIR__ . '/build', 
		array( 
			'render_callback' => 'render_hrs_sample_block',
		) 
	);
}
add_action( 'init', 'hrs_sample_block_init' );
