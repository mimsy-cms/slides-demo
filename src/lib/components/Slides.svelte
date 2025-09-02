<script lang="ts">
	import { onMount } from 'svelte';
	import type { Presentation } from '$lib/types/slides.js';
	import SlideContent from './SlideContent.svelte';
	import SlideControls from './SlideControls.svelte';

	let { presentation }: { presentation: Presentation } = $props();

	let currentSlideIndex = $state(0);
	let isTransitioning = $state(false);
	let showControls = $state(true);
	let hideTimeout: number;
	let lastMouseX = 0;
	let lastMouseY = 0;
	let mouseMovementThreshold = 10; // Pixels of movement required to trigger controls

	const totalSlides = presentation.slides.length;
	const currentSlide = $derived(presentation.slides[currentSlideIndex]);
	const progress = $derived(((currentSlideIndex + 1) / totalSlides) * 100);

	function nextSlide() {
		if (currentSlideIndex < totalSlides - 1 && !isTransitioning) {
			isTransitioning = true;
			setTimeout(() => {
				currentSlideIndex++;
				isTransitioning = false;
			}, 150);
		}
	}

	function prevSlide() {
		if (currentSlideIndex > 0 && !isTransitioning) {
			isTransitioning = true;
			setTimeout(() => {
				currentSlideIndex--;
				isTransitioning = false;
			}, 150);
		}
	}

	function goToSlide(index: number) {
		if (index >= 0 && index < totalSlides && index !== currentSlideIndex && !isTransitioning) {
			isTransitioning = true;
			setTimeout(() => {
				currentSlideIndex = index;
				isTransitioning = false;
			}, 150);
		}
	}

	function showControlsTemporarily() {
		showControls = true;
		clearTimeout(hideTimeout);
		hideTimeout = setTimeout(() => {
			showControls = false;
		}, 1000);
	}

	function handleMouseMove(event: MouseEvent) {
		// Calculate the distance moved
		const deltaX = Math.abs(event.clientX - lastMouseX);
		const deltaY = Math.abs(event.clientY - lastMouseY);

		// Only show controls if movement exceeds threshold
		if (deltaX > mouseMovementThreshold || deltaY > mouseMovementThreshold) {
			showControlsTemporarily();
			lastMouseX = event.clientX;
			lastMouseY = event.clientY;
		}
	}

	function handleKeydown(event: KeyboardEvent) {
		switch (event.key) {
			case 'ArrowRight':
			case ' ':
				event.preventDefault();
				nextSlide();
				break;
			case 'ArrowLeft':
				event.preventDefault();
				prevSlide();
				break;
			case 'Home':
				event.preventDefault();
				goToSlide(0);
				break;
			case 'End':
				event.preventDefault();
				goToSlide(totalSlides - 1);
				break;
			default:
				showControlsTemporarily();
		}
	}

	onMount(() => {
		window.addEventListener('keydown', handleKeydown);
		// Initialize mouse position
		window.addEventListener(
			'mousemove',
			(e) => {
				if (lastMouseX === 0 && lastMouseY === 0) {
					lastMouseX = e.clientX;
					lastMouseY = e.clientY;
				}
			},
			{ once: true }
		);
		showControlsTemporarily(); // Show controls initially
		return () => {
			window.removeEventListener('keydown', handleKeydown);
			clearTimeout(hideTimeout);
		};
	});
</script>

<div
	role="presentation"
	class="fixed inset-0 flex cursor-none flex-col bg-gradient-to-br from-slate-50 to-slate-100"
	onmousemove={handleMouseMove}
>
	<!-- Progress bar - always visible -->
	<div class="absolute top-0 left-0 z-20 h-1 w-full bg-slate-200">
		<div
			class="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-300 ease-out"
			style="width: {progress}%"
		></div>
	</div>

	<!-- Main content area - truly fullscreen -->
	<div class="flex flex-1 items-center justify-center">
		<div
			class="h-full w-full transition-all duration-300 ease-in-out"
			class:opacity-50={isTransitioning}
			class:scale-95={isTransitioning}
		>
			<SlideContent slide={currentSlide} />
		</div>
	</div>

	<!-- Controls - auto-hide after 5 seconds -->
	<div
		class="absolute right-0 bottom-0 left-0 z-20 p-6 transition-opacity duration-300"
		class:opacity-100={showControls}
		class:opacity-0={!showControls}
	>
		<SlideControls {currentSlideIndex} {totalSlides} onPrev={prevSlide} onNext={nextSlide} />
	</div>
</div>
