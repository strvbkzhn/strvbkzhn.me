<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex-1">
	<div class="mx-auto max-w-5xl px-4 py-8">
		<h1 class="font-bold">{page.status}</h1>
		<p class="empty:hidden">{page.error?.message}</p>
	</div>
</div>
