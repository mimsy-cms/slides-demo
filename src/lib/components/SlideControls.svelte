<script lang="ts">
	let { 
		currentSlideIndex,
		totalSlides,
		onPrev,
		onNext
	}: {
		currentSlideIndex: number;
		totalSlides: number;
		onPrev: () => void;
		onNext: () => void;
	} = $props();

	const canGoPrev = $derived(currentSlideIndex > 0);
	const canGoNext = $derived(currentSlideIndex < totalSlides - 1);
	const slideNumber = $derived(currentSlideIndex + 1);
</script>

<div class="bg-black bg-opacity-50 backdrop-blur-sm rounded-2xl p-6">
	<div class="flex items-center justify-between max-w-4xl mx-auto">
		<!-- Previous Button -->
		<button 
			onclick={onPrev}
			disabled={!canGoPrev}
			class="flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200
				   {canGoPrev 
					   ? 'bg-white bg-opacity-90 hover:bg-opacity-100 text-black backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105' 
					   : 'bg-white bg-opacity-50 text-black text-opacity-50 cursor-not-allowed'}"
		>
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
			</svg>
			Previous
		</button>

		<!-- Slide Counter -->
		<div class="flex items-center gap-6 bg-white bg-opacity-90 px-4 py-2 rounded-lg">
			<span class="font-medium text-lg text-black">
				{slideNumber} / {totalSlides}
			</span>
			
			<!-- Dots indicator -->
			<div class="flex gap-2">
				{#each Array(totalSlides) as _, index}
					<div 
						class="w-3 h-3 rounded-full transition-all duration-200 
							   {index === currentSlideIndex ? 'bg-blue-500' : 'bg-black bg-opacity-40'}"
					></div>
				{/each}
			</div>
		</div>

		<!-- Next Button -->
		<button 
			onclick={onNext}
			disabled={!canGoNext}
			class="flex items-center gap-3 px-6 py-3 rounded-xl font-medium transition-all duration-200
				   {canGoNext 
					   ? 'bg-white bg-opacity-90 hover:bg-opacity-100 text-black backdrop-blur-sm shadow-lg hover:shadow-xl transform hover:scale-105' 
					   : 'bg-white bg-opacity-50 text-black text-opacity-50 cursor-not-allowed'}"
		>
			Next
			<svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
				<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
			</svg>
		</button>
	</div>

	<!-- Keyboard shortcuts hint -->
	<div class="mt-4 text-center text-sm text-white text-opacity-80">
		Use <kbd class="px-3 py-1 bg-white bg-opacity-90 rounded-lg text-xs font-mono text-black">←</kbd> 
		<kbd class="px-3 py-1 bg-white bg-opacity-90 rounded-lg text-xs font-mono text-black">→</kbd> 
		or <kbd class="px-3 py-1 bg-white bg-opacity-90 rounded-lg text-xs font-mono text-black">Space</kbd> to navigate
	</div>
</div>