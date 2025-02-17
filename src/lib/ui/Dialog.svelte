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
		'min-h-md relative mx-auto my-auto hidden min-w-sm flex-col items-start gap-4 rounded-xs p-4 shadow-2xl backdrop:bg-black/10 backdrop:backdrop-blur-xs open:flex',
		clazz
	)}
	{...others}
>
	<div class="flex w-full items-center justify-between pr-2 pl-1">
		<p>{title}</p>
		<Button as="button" onclick={close}>X</Button>
	</div>
	{@render children?.({ close })}
</dialog>
