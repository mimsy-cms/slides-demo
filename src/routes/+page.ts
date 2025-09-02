import type { PageLoad } from './$types';
import { getSlides } from '$lib/provider';

export const load: PageLoad = async () => {
	const presentation = await getSlides();
	return {
		presentation
	};
};