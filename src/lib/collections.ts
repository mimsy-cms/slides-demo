import { collection, fields } from '@mimsy-cms/sdk';

export const Slides = collection('slides', {
	order: fields.number({
		description:
			'The order of the slide (the number of the slide). Please ensure that the order is unique and sequential.'
	}),
	title: fields.shortString({
		description: 'The title of the slide',
		constraints: {
			maxLength: 100
		}
	}),
	content: fields.shortString({
		description: 'The content of the slide',
		constraints: {
			maxLength: 1000
		}
	}),
	image: fields.media({
		description: 'The image of the slide',
		constraints: {
			required: false
		}
	}),
	type: fields.shortString({
		description: 'The type of the slide',
		constraints: {
			required: false
		}
	})
});
