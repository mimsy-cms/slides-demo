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
	let contentElement: HTMLDivElement;

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

<div class="flex h-full w-full flex-col bg-white p-16 shadow-lg">
	<!-- Slide Title -->
	<header class="mb-12">
		<h1 class="text-6xl leading-tight font-bold text-gray-900">
			{slide.title}
		</h1>
	</header>

	<div class="flex flex-1 flex-col gap-16 lg:flex-row">
		<!-- Content Section -->
		<div class="flex-1">
			<div class="prose prose-2xl max-w-none" bind:this={contentElement}>
				{#await parseMarkdown(slide.content)}
					...
				{:then content}
					<!-- eslint-disable svelte/no-at-html-tags -->
					{@html content}
				{/await}
			</div>
		</div>

		<!-- Image Section -->
		{#if slide.image}
			<div class="flex-shrink-0 lg:w-[600px]">
				<img
					src={slide.image}
					alt="Slide visual content"
					class="h-auto max-h-[600px] w-full rounded-lg object-cover shadow-md"
					loading="lazy"
				/>
			</div>
		{/if}
	</div>
</div>
