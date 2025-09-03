<script lang="ts">
	import type { Slide } from '$lib/types/slides.js';
	import { marked } from 'marked';

	let { slide }: { slide: Slide } = $props();

	async function parseMarkdown(content: string): Promise<string> {
		return marked.parse(content);
	}
</script>

<!-- Full image layout - image only -->
<div class="relative w-full h-full z-20 p-4">
	<img
		src={slide.image}
		alt="Slide visual content"
		class="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-contain rounded-lg"
		loading="lazy"
	/>
</div>