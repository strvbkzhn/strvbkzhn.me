<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLDialogAttributes } from 'svelte/elements';
	import cn from 'classnames';
	import { Button } from '$lib/ui';

	type Props = {
		title?: string;
		dialogTrigger?: Snippet<[open: () => void]>;
		children?: Snippet<[props: { close: () => void }]>;
	} & Omit<HTMLDialogAttributes, 'children'>;

	let { children, class: clazz, title, dialogTrigger, ...others }: Props = $props();

	let dialog: HTMLDialogElement;

	const open = () => dialog.showModal();

	const close = () => dialog.close();
</script>

{@render dialogTrigger?.(open)}
<dialog
	bind:this={dialog}
	class={cn(
		'relative mx-auto my-auto hidden max-w-md min-w-sm flex-col items-start gap-2 rounded-xs px-5 py-4 shadow-2xl backdrop:bg-black/10 backdrop:backdrop-blur-xs open:flex sm:min-w-md',
		clazz
	)}
	{...others}
>
	<div class="flex w-full items-center justify-between">
		<p>{title}</p>
		<Button as="button" class="text-red-500" onclick={close}>X</Button>
	</div>
	{@render children?.({ close })}
</dialog>
