import App from './App/index.svelte';

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;