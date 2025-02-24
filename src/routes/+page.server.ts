import type { Actions } from './$types';
import { verifyTurnstileToken, getCountry, sendMessage } from '$lib/services';

export const actions = {
	default: async ({ request }) => {
		const data = await request.formData();

		const message = data.get('message');
		const token = data.get('cf-turnstile-response');
		const ip = request.headers.get('x-forwarded-for')?.split(',')[0];

		if (!token || !(await verifyTurnstileToken(token))) {
			return { success: false, error: 'Nice try!' };
		}

		const country = ip && (await getCountry(ip));

		const sent = await sendMessage(
			`<code style="padding:12px 14px;background:#EFF6FF4D;display:block;border-radius:2px;white-space:pre-wrap;border:2px dotted #8ec5ff;">Country: ${country || 'N/A'}, IP: ${ip || 'N/A'}

···

${message}
</code>`
		);

		return { success: sent };
	}
} satisfies Actions;
