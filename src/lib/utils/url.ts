import { page } from '$app/state';

export function checkSamePage(href: string | null | undefined): boolean {
	if (!href?.trim()) return false;

	const targetUrl = new URL(href, page.url.origin);
	const activeUrl = page.url;

	return targetUrl.origin === activeUrl.origin && targetUrl.pathname === activeUrl.pathname;
}
