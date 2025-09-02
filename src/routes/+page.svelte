<script lang="ts">
	import Slides from '$lib/components/Slides.svelte';
	import type { PageData } from './$types';
	
	export let data: PageData;
</script>

<Slides presentation={data.presentation} />
