<script lang="ts">
	import { Button, Dialog } from '$lib/ui';
</script>

<header class="text-lg">
	<nav class="mx-auto flex max-w-5xl items-center justify-end gap-8 p-4 pt-12">
		<Button href="/">home</Button>
		<Dialog title="Dialog title">
			{#snippet dialogTrigger(open)}
				<Button as="button" onclick={open}>dialog</Button>
			{/snippet}
		</Dialog>
		<ul class="flex flex-1 items-center justify-end gap-8">
			<li>
				<Button href="/info">info</Button>
			</li>
			<li>
				<Button href="/work">work</Button>
			</li>
		</ul>
	</nav>
</header>
