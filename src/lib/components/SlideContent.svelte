<script lang="ts">
	import type { Slide } from '$lib/types/slides.js';
	import FirstSlide from './FirstSlide.svelte';
	import ImageSlide from './slides/ImageSlide.svelte';
	import ImageBelowSlide from './slides/ImageBelowSlide.svelte';
	import NoImageSlide from './slides/NoImageSlide.svelte';
	import StandardSlide from './slides/StandardSlide.svelte';

	let { slide, slideIndex = -1 }: { slide: Slide; slideIndex?: number } = $props();

	$inspect(slide);
</script>

{#if slideIndex === 0}
	<FirstSlide {slide} />
{:else}
	<!-- Standard layout for other slides -->
	<div class="relative flex h-full w-full flex-col overflow-hidden bg-white shadow-lg">
		<!-- Braille pattern from very top to end of title section -->
		<div
			class="pointer-events-none absolute -top-[12vw] -left-[12vw] z-0 h-[calc(5vw+2vh+24vw)] w-[calc(100%+24vw)] rotate-12 opacity-8 select-none"
		>
			{#each Array(30) as _, row (row)}
				<div class="font-mono text-[1.2vw] leading-tight whitespace-nowrap">
					{#each Array(35) as _, col (col)}
						<span class="mx-[0.3vw]">⠍⠊⠍⠎⠽</span>
					{/each}
				</div>
			{/each}
		</div>

		<!-- White clipping rectangle to hide braille below title -->
		<div
			class="absolute top-[calc(5vw+4vh+4vw)] left-0 z-10 h-full w-full border-t-[1vw] border-gray-400 bg-white"
		></div>

		<!-- Slide Title -->
		<header class="relative z-20 p-[4vw] pb-[4vh] h-[calc(5vw+8vh)]">
			<h1 class="relative leading-tight font-bold text-gray-900 whitespace-nowrap overflow-hidden text-ellipsis" style="font-size: clamp(1vw, 4vw, 5vw);">
				{slide.title}
			</h1>
		</header>

		<!-- Content area positioned after fixed header height -->
		<div class="absolute top-[calc(5vw+13vh)] left-0 right-0 bottom-0 z-20">
			{#if slide.type === 'image'}
				<ImageSlide {slide} />
			{:else if slide.type === 'image-below'}
				<ImageBelowSlide {slide} />
			{:else if slide.type === 'no-image'}
				<NoImageSlide {slide} />
			{:else}
				<StandardSlide {slide} />
			{/if}
		</div>
	</div>
{/if}
