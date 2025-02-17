<script lang="ts">
	import '../app.css';
	import { Header, Footer } from '$lib/components';

	let { children } = $props();
</script>

<div class="@container flex min-h-[100dvh] flex-col overflow-x-hidden">
	<Header />
	{@render children()}
	<Footer />
</div>
