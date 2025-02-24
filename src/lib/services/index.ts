import { Resend } from 'resend';
import { CLOUDFLARE_SECRET_KEY, RESEND_API_KEY } from '$env/static/private';

export async function verifyTurnstileToken(token: FormDataEntryValue, ip?: FormDataEntryValue) {
	let formData = new FormData();
	formData.append('secret', CLOUDFLARE_SECRET_KEY);
	formData.append('response', token);
	if (ip) formData.append('remoteip', ip);

	const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
		body: formData,
		method: 'POST'
	});

	if (response.ok) {
		const data = await response.json();
		if (data.success) {
			return true;
		}
	}

	return false;
}

export async function getCountry(ip: string) {
	const response = await fetch('https://api.country.is/' + ip);

	if (response.ok) {
		const data = await response.json();
		const country = data.country;
		if (typeof country === 'string') {
			return country;
		}
	}
}

export async function sendMessage(message: string) {
	const resend = new Resend(RESEND_API_KEY);

	const result = await resend.emails.send({
		from: 'onboarding@resend.dev',
		to: 'satarovbekzhan@gmail.com',
		subject: 'New message!',
		html: message
	});

	console.log('resend', result.data || result.error);

	return Boolean(result.data);
}
