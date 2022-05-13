/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
import { registerBlockType } from '@wordpress/blocks';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';

/**
 * Internal dependencies
 */
import Edit from './edit';
import save from './save';

/**
 * Every block starts by registering a new block type definition.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-registration/
 */
registerBlockType( 'hrs-sample-block/hrs-sample-block', {
	attributes: {
        content: {
            type: 'array',
            source: 'children',
            selector: 'p',
			default: 'Your content is here, go ahead edit directly.',
        },
		alignment: {
            type: 'string',
            default: 'none',
        },
		style: { // The control is declared on supports > color > background & text
			type: 'object',
			default: {
				color: {
					text: '#ffffff',
					background: '#21759b',
				}
			}
		},
		content_title: { 
			type: 'string', 
			default: 'Your title' 
		},
        content_footer: { 
			type: 'string', 
			default: 'Your footer' 
		},
		padding: { 
			type: 'number', 
			default: 25 
		},
    },
	/**
	 * @see ./edit.js
	 */
	edit: Edit,
	/**
	 * @see ./save.js
	 */
	save,
} );
