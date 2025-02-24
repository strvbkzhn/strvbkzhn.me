<script lang="ts">
	import { Button } from '$lib/ui';
</script>

<header>
	<nav class="mx-auto flex max-w-5xl items-center justify-end gap-8 p-4 pt-12">
		<!-- <Button href="/">home</Button> -->
		<a href="/">
			<img src="/favicon.png" alt="Bekzhan" class="h-7 w-7" />
		</a>
		<ul class="flex flex-1 items-center justify-end gap-8">
			<li>
				<Button href="/">info</Button>
			</li>
			<li>
				<Button href="/work">work</Button>
			</li>
		</ul>
	</nav>
</header>
