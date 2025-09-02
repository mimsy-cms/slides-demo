import { Slides } from './collections';
import type { Presentation } from './types/slides';
import { MimsyClient } from '@mimsy-cms/sdk';
export async function getSlides(): Promise<Presentation> {
	const api = new MimsyClient('https://cms.mimsy.kodai.ch/api');
	try {
		const slides = await api.with(Slides).all();

		// Sort slides by order
		slides.sort((a, b) => a.order - b.order);

		const presentation: Presentation = {
			id: 'mimsy-presentation',
			title: 'Mimsy Presentation',
			slides: slides.map((slide) => {
				return {
					// eslint-disable-next-line @typescript-eslint/no-explicit-any
					id: (slide as any)['id'],
					title: slide.title,
					content: slide.content,
					order: slide.order
				};
			})
		};

		return presentation;
	} catch (error) {
		console.error('Error fetching slides:', error);
		throw error;
	}
}
