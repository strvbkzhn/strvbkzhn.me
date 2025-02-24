<script lang="ts">
	import { Button } from '$lib/ui';
</script>

<footer>
	<div class="mx-auto flex max-w-5xl flex-wrap items-start justify-between gap-2 p-4 sm:gap-4">
		<section class="flex sm:flex-col">
			<h2 class="whitespace-nowrap">me —&nbsp;</h2>
			<Button href="https://en.wikipedia.org/wiki/Front-end_web_development" external
				>frontend web developer</Button
			>
		</section>
		<section class="flex sm:flex-col">
			<h2 class="whitespace-nowrap">contact —&nbsp;</h2>
			<Button href="https://forms.gle/A5FhrmeDsqECogj9A" external>submit a contact form</Button>
		</section>
		<section class="flex sm:flex-col">
			<h2 class="whitespace-nowrap">social —&nbsp;</h2>
			<div class="flex flex-wrap items-end">
				<Button href="https://www.linkedin.com/in/strvbkzhn/" external>Linkedin</Button>
				,&nbsp;
				<Button href="https://www.instagram.com/strvbkzhn/" external>Instagram</Button>
				,&nbsp;
				<Button href="https://www.github.com/strvbkzhn/" external>GitHub</Button>
			</div>
		</section>
	</div>
</footer>
