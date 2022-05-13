/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

/**
 * WordPress block-editor.
 *
 * @see https://developer.wordpress.org/block-editor/packages/packages-block-editor/
 */
import {
    useBlockProps,
    RichText,
} from '@wordpress/block-editor';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#save
 *
 * @return {WPElement} Element to render.
 */
export default function save( { attributes } ) {
	const blockProps = useBlockProps.save();

	return (
		<div { ...blockProps }>
			<div 
				style={ {
					textAlign: attributes.alignment,
					paddingLeft: attributes.padding,
					paddingRight: attributes.padding,
				} }
			>
				<h2>{ attributes.content_title }</h2>
				<RichText.Content
					className={ `sample-wp-block` }
					tagName="p"
					value={ attributes.content }
				/>
				<h4>{ attributes.content_title }</h4>
			</div>
		</div>
	);
}
