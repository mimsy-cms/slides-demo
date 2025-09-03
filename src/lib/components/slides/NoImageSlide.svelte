<script lang="ts">
	import type { Slide } from '$lib/types/slides.js';
	import { marked } from 'marked';
	import Prism from 'prismjs';
	import 'prismjs/components/prism-typescript';
	import 'prismjs/components/prism-javascript';
	import 'prismjs/components/prism-jsx';
	import 'prismjs/components/prism-tsx';
	import 'prismjs/components/prism-css';
	import 'prismjs/components/prism-json';
	import 'prismjs/components/prism-bash';
	import '$lib/prism.css';

	let { slide }: { slide: Slide } = $props();

	// Configure marked with custom renderer
	const renderer = new marked.Renderer();

	// Custom code block renderer with Prism highlighting
	renderer.code = function (code) {
		// Handle both string and object formats
		const codeStr = typeof code === 'object' && code?.text ? code.text : String(code || '');
		const lang = typeof code === 'object' && code?.lang ? code.lang : 'typescript';

		try {
			const highlighted = Prism.highlight(
				codeStr,
				Prism.languages[lang] || Prism.languages.typescript,
				lang
			);
			return `<pre class="language-${lang} my-6"><code class="language-${lang}">${highlighted}</code></pre>`;
		} catch (e) {
			console.error('Prism highlighting failed:', e);
			const escapedCode = codeStr
				.replace(/&/g, '&amp;')
				.replace(/</g, '&lt;')
				.replace(/>/g, '&gt;');
			return `<pre class="language-${lang} my-6"><code class="language-${lang}">${escapedCode}</code></pre>`;
		}
	};

	marked.setOptions({
		renderer: renderer,
		breaks: true,
		gfm: true
	});

	async function parseMarkdown(content: string): Promise<string> {
		return marked.parse(content);
	}
</script>

<!-- Text only layout - no image display -->
<div class="relative flex w-full h-full flex-col px-[4vw] pb-[4vw] z-20">
	<div class="flex-1 flex items-center justify-center">
		<div class="prose prose-2xl max-w-none [&_h4]:text-[1.5vw] [&_h4]:font-normal [&_h4]:text-gray-500 [&_h3]:text-[2.5vw] [&_p]:text-[2vw] [&_ul]:text-[2vw] [&_ol]:text-[2vw] [&_li]:mb-[1vh] [&_p]:leading-relaxed">
			{#await parseMarkdown(slide.content)}
				...
			{:then content}
				<!-- eslint-disable svelte/no-at-html-tags -->
				{@html content}
			{/await}
		</div>
	</div>
</div>