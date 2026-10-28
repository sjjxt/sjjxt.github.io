<script lang="ts">
import { onMount } from "svelte";
import { getSnowEnabled, setSnowEnabled } from "@/utils/snow-settings";
import { getStoredSakuraEnabled, setSakuraEnabled } from "@/utils/setting-utils";

let snow = $state(false);
let sakura = $state(false);
onMount(() => {
	snow = getSnowEnabled();
	sakura = getStoredSakuraEnabled();
});
</script>

<div id="display-setting" class="float-panel float-panel-closed absolute transition-all w-64 right-4 p-3" data-floating-panel data-floating-panel-trigger="display-settings-switch" inert aria-hidden="true">
	<div class="text-sm font-bold px-2 pb-2">飘落特效</div>
	{#each ["snow", "sakura"] as effect}
		{@const enabled = effect === "snow" ? snow : sakura}
		<button
			class="w-full btn-regular rounded-md py-2 px-3 my-1 flex items-center gap-3 text-left"
			role="switch"
			aria-label={effect === "snow" ? "雪花特效" : "樱花特效"}
			aria-checked={enabled}
			onclick={() => {
				if (effect === "snow") { snow = !snow; setSnowEnabled(snow); }
				else { sakura = !sakura; setSakuraEnabled(sakura); }
			}}
		>
			<span aria-hidden="true">{effect === "snow" ? "❄" : "🌸"}</span>
			<span class="text-sm flex-1">{effect === "snow" ? "雪花特效" : "樱花特效"}</span>
			<span class="w-10 h-5 rounded-full relative transition-colors" class:bg-(--primary)={enabled} class:bg-(--btn-regular-bg-active)={!enabled}>
				<span class="absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform" class:translate-x-5={enabled}></span>
			</span>
		</button>
	{/each}
</div>
