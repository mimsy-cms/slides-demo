<script lang="ts">
	import type { Slide } from '$lib/types/slides.js';
	import { marked } from 'marked';

	let { slide }: { slide: Slide } = $props();
	let contentElement: HTMLDivElement;

	async function parseMarkdown(content: string): Promise<string> {
		return marked.parse(content);
	}
	
	// Braille for "mimsy": ⠍⠊⠍⠎⠽
	const braillePattern = "⠍⠊⠍⠎⠽";
</script>

<div class="relative flex h-full w-full flex-col items-center justify-center bg-white overflow-hidden">
	<!-- Background pattern of braille with rotation -->
	<div class="absolute inset-0 -top-[50%] -left-[50%] w-[200%] h-[200%] opacity-10 select-none pointer-events-none rotate-12">
		{#each Array(50) as _, row}
			<div class="whitespace-nowrap text-[1.5vw] font-mono leading-tight">
				{#each Array(30) as _, col}
					<span class="mx-[0.5vw]">{braillePattern}</span>
				{/each}
			</div>
		{/each}
	</div>
	
	<!-- Main callout box -->
	<div class="relative">
		<!-- Shadow (darker gray square offset) -->
		<div class="absolute top-[0.5vw] left-[0.5vw] w-full h-full bg-gray-600"></div>
		
		<!-- Main gray rectangle -->
		<div class="relative bg-gray-300 px-[5vw] py-[4vh]">
			<!-- Title in large text -->
			<h1 class="text-[7vw] font-mono font-black tracking-wider text-black text-center leading-none">
				{slide.title}
			</h1>
		</div>
	</div>

	<!-- Centered slide content below -->
	<div class="text-center px-[4vw] mt-[3vh] relative">
		<div class="prose prose-2xl max-w-none mx-auto text-center [&_h2]:text-[3vw] [&_h2]:font-normal [&_h2]:mb-[2vh] [&_h2]:text-black [&_h3]:text-[2.8vw] [&_h4]:text-[1.2vw] [&_h4]:font-normal [&_h4]:text-gray-400 [&_h4]:leading-relaxed [&_h4]:mb-[0.5vh] [&_p]:text-[2.2vw] [&_p]:font-normal [&_p]:mb-[2vh] [&_p]:text-black" bind:this={contentElement}>
			{#await parseMarkdown(slide.content)}
				...
			{:then content}
				<!-- eslint-disable svelte/no-at-html-tags -->
				{@html content}
			{/await}
		</div>
	</div>
</div>