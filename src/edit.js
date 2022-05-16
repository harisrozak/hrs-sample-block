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
    AlignmentToolbar,
    BlockControls,
    InspectorControls,
} from '@wordpress/block-editor';

/**
 * WordPress components.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/components/
 */
import {
	PanelBody,
    TextControl,
	RangeControl,
	SelectControl,
} from '@wordpress/components';

/**
 * WordPress data.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-data/
 */
import { useSelect } from '@wordpress/data';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
export default function Edit( { attributes, setAttributes } ) {
	const onChangeContent = ( html ) => {
		setAttributes( { content: html } );
	};
	const onChangeAlignment = ( newAlignment ) => {
		setAttributes( {
			alignment: newAlignment === undefined ? 'none' : newAlignment,
		} );
	};

	const posts = useSelect( ( select ) => {
		return select( 'core' ).getEntityRecords( 'postType', attributes.post_type, {
			per_page: attributes.posts_count,
		} );
	}, [] );

	const printPosts = ( posts ) => {
		return ( 
			<ul>
				{ 
					posts.map( ( post, index ) => (
						<li>
							<a href={ post.link }>
								{ post.title.rendered }
							</a>
						</li>
					) )
				}
			</ul>
		);
	}
	
	return (		
		<div { ...useBlockProps() }>
			<BlockControls>
				<AlignmentToolbar
					value={ attributes.alignment }
					onChange={ onChangeAlignment }
				/>
			</BlockControls>

			<InspectorControls key="setting">
				<PanelBody title={ __( 'Text', 'hrs-sample-block' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Title Text', 'hrs-sample-block' ) }
						value={ attributes.content_title }
						onChange={ text => setAttributes( { content_title: text } ) }
					/>
					<TextControl
						label={ __( 'Footer Text', 'hrs-sample-block' ) }
						value={ attributes.content_footer }
						onChange={ text => setAttributes( { content_footer: text } ) }
					/>
				</PanelBody>	
				<PanelBody>
                    <RangeControl
                        beforeIcon="arrow-left-alt2"
                        afterIcon="arrow-right-alt2"
                        label={ __( 'Padding Left and Right', 'hrs-sample-block' ) }
                        value={ attributes.padding }
                        onChange={ number => setAttributes( { padding: number } ) }
                        min={ 0 }
                        max={ 100 }
                    />
                </PanelBody>
				<PanelBody title={ __( 'Post List', 'hrs-sample-block' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Post Type', 'hrs-sample-block' ) }
						value={ attributes.post_type }
						options={ [
							{ label: 'Post', value: 'post' },
							{ label: 'Page', value: 'page' },
						] }
						onChange={ string => setAttributes( { post_type: string } ) }
					/>
					<RangeControl
						beforeIcon="arrow-left-alt2"
						afterIcon="arrow-right-alt2"
						label={ __( 'Posts Count', 'hrs-sample-block' ) }
						value={ attributes.posts_count }
						onChange={ number => setAttributes( { posts_count: number } ) }
						min={ 1 }
						max={ 25 }
					/>
				</PanelBody>
			</InspectorControls>

			<div 
				style={ { 
					textAlign: attributes.alignment,
					paddingLeft: attributes.padding,
					paddingRight: attributes.padding,
				} }
			>				
				<h2>{ attributes.content_title }</h2>
				<RichText
					tagName="p"
					onChange={ onChangeContent }
					value={ attributes.content }
				/>
				<div>
					{ ! posts && 'Loading' }
					{ posts && posts.length === 0 && 'No Posts' }
					{ posts && posts.length > 0 && printPosts( posts ) }
				</div>
				<h4>{ attributes.content_footer }</h4>
			</div>
		</div>
	);
}
