<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import cn from 'classnames';
	import { checkSamePage } from '$lib/utils';

	type Props<T extends 'a' | 'button'> = {
		as?: 'a' | 'button';
		external?: boolean;
	} & (T extends 'a' ? HTMLAnchorAttributes : HTMLButtonAttributes);

	let {
		children,
		class: clazz,
		as = 'a',
		external = false,
		...others
	}: Props<'a' | 'button'> = $props();

	const isSamePage = $derived(checkSamePage((others as Props<'a'>).href));

	let a: HTMLElement;

	const mousemoveListener = (e: MouseEvent) => {
		const position = a.getBoundingClientRect();
		const x = e.clientX - position.left - position.width / 2;
		const y = e.clientY - position.top - position.height / 2;

		const span = a.children[0] as HTMLSpanElement;
		span.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
		span.style.setProperty('--before-translate-x', `${x * 0.1}px`);
		span.style.setProperty('--before-translate-y', `${y * 0.1}px`);
	};

	const mouseoutListener = () => {
		const span = a.children[0] as HTMLSpanElement;
		span.style.transform = 'translate(0px, 0px)';
		span.style.setProperty('--before-translate-x', '0px');
		span.style.setProperty('--before-translate-y', '0px');
	};

	onMount(() => {
		a.addEventListener('mousemove', mousemoveListener);
		a.addEventListener('mouseout', mouseoutListener);

		return () => {
			a.removeEventListener('mousemove', mousemoveListener);
			a.removeEventListener('mouseout', mouseoutListener);
		};
	});
</script>

<svelte:element
	this={as}
	bind:this={a}
	class="relative text-center"
	class:*:line-through={isSamePage}
	target={external ? '_blank' : undefined}
	rel={external ? 'noopener' : undefined}
	{...others}
>
	<span
		class={cn(
			"hover:z- relative inline-block cursor-pointer text-blue-500 transition-all duration-200 ease-linear before:absolute before:inset-1/2 before:-top-0.5 before:right-2 before:bottom-0.5 before:-left-2 before:-z-1 before:[transform:translate(var(--before-translate-x,0px),var(--before-translate-y,0px))] before:bg-[length:100%_100%] before:bg-center before:transition-all before:duration-150 before:ease-linear before:content-[''] hover:before:h-[calc(100%+0.25rem)] hover:before:w-[calc(100%+1rem)] hover:before:bg-[url(/images/bg-strong.svg)]",
			'backdrop-opacity-10 before:opacity-0 hover:before:opacity-100',
			clazz
		)}
	>
		{@render children?.()}
	</span>
</svelte:element>
