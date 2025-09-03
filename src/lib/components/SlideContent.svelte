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
	import FirstSlide from './FirstSlide.svelte';

	let { slide, slideIndex = -1 }: { slide: Slide; slideIndex?: number } = $props();
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

{#if slideIndex === 0}
	<FirstSlide {slide} />
{:else}
	<!-- Standard layout for other slides -->
	<div class="relative flex h-full w-full flex-col bg-white shadow-lg overflow-hidden">
		<!-- Braille pattern from very top to end of title section -->
		<div class="absolute -top-[12vw] -left-[12vw] w-[calc(100%+24vw)] h-[calc(5vw+2vh+24vw)] opacity-8 select-none pointer-events-none rotate-12 z-0">
			{#each Array(25) as _, row}
				<div class="whitespace-nowrap text-[1.2vw] font-mono leading-tight">
					{#each Array(35) as _, col}
						<span class="mx-[0.3vw]">⠍⠊⠍⠎⠽</span>
					{/each}
				</div>
			{/each}
		</div>
		
		<!-- White clipping rectangle to hide braille below title -->
		<div class="absolute top-[calc(5vw+4vh+4vw)] left-0 w-full h-full bg-white border-t-[1vw] border-gray-400 z-10"></div>
		
		<!-- Slide Title -->
		<header class="relative p-[4vw] pb-[4vh] z-20">
			<h1 class="relative text-[5vw] leading-tight font-bold text-gray-900">
				{slide.title}
			</h1>
		</header>

		<div class="relative flex flex-1 flex-col gap-[2vw] lg:flex-row px-[4vw] pb-[4vw] z-20">
			<!-- Content Section -->
			<div class="flex-1">
				<div class="prose prose-2xl max-w-none [&_h4]:text-[1.5vw] [&_h4]:font-normal [&_h4]:text-gray-500 [&_h3]:text-[2.5vw] [&_p]:text-[2vw] [&_ul]:text-[2vw] [&_ol]:text-[2vw] [&_li]:mb-[1vh] [&_p]:leading-relaxed" bind:this={contentElement}>
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
				<div class="flex-shrink-0 lg:w-[35vw]">
					<img
						src={slide.image}
						alt="Slide visual content"
						class="h-auto max-h-[70vh] w-full rounded-lg object-cover shadow-md"
						loading="lazy"
					/>
				</div>
			{/if}
		</div>
	</div>
{/if}
