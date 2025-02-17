<script lang="ts">
	import { onMount } from 'svelte';
	import type { HTMLAnchorAttributes, HTMLButtonAttributes } from 'svelte/elements';
	import cn from 'classnames';
	import { checkSamePage } from '$lib/utils';

	type Props<T extends 'a' | 'button'> = {
		as?: 'a' | 'button';
		external?: boolean;
		equilateral?: boolean;
	} & (T extends 'a' ? HTMLAnchorAttributes : HTMLButtonAttributes);

	let {
		children,
		class: clazz,
		as = 'a',
		external = false,
		equilateral = false,
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
			'relative inline-block cursor-pointer text-gray-500 transition-all duration-200 ease-linear before:absolute before:-top-0.5 before:bottom-0.5 before:-z-10 before:h-[calc(100%+0.25rem)] before:[transform:translate(var(--before-translate-x,0px),var(--before-translate-y,0px))] before:rounded-md before:transition-all before:duration-150 before:ease-linear hover:z-20 hover:text-black hover:before:bg-neutral-200',
			{
				'before:right-0.5 before:-left-0.5 before:w-[calc(100%+0.25rem)]': equilateral,
				'before:right-2.5 before:-left-2.5 before:w-[calc(100%+1.25rem)]': !equilateral
			},
			clazz
		)}
	>
		{@render children?.()}
	</span>
</svelte:element>
