<script>
	import { FetchGet } from "../Libs/fetch.js";
	import { route } from "../Store/index.js";

	import { Toasts } from "as-toast";

	import Layout from "../Components/Layout/index.svelte";
	import Home from "../Components/Home/index.svelte";
	import TitlePage from "../Components/TitlePage/index.svelte";
	import NewField from "../Components/NewField/index.svelte";
	import ShowFields from "../Components/ShowFields/index.svelte";

	// fetch info and save in store
	FetchGet();
</script>

<Layout>
	<Toasts />
	<div class="container">
		<TitlePage title={"Teste II - iColabora"} />

		{#if $route === "Home"}
			<Home />
		{/if}

		{#if $route === "NewField"}
			<NewField />
		{/if}

		{#if $route === "ShowFields"}
			<ShowFields />
		{/if}
	</div>
</Layout>

<style lang="scss">
	:root {
		--as-toast-info-background: hsl(51, 82%, 85%);
	}
	@import "./style.scss";
</style>
