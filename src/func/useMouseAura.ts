import { onMounted, onBeforeUnmount, ref } from "vue";

export function useMouseAura() {
	const aura = ref<HTMLElement | null>(null);

	const updateAuraPosition = (e: PointerEvent) => {
		if(aura.value) {
			document.documentElement.style.setProperty("--mouse-x", `${e.clientX}px`);
            document.documentElement.style.setProperty("--mouse-y", `${e.clientY}px`);
		}
	}

	onMounted(() => {
		window.addEventListener("pointermove", updateAuraPosition);
	});

	onBeforeUnmount(() => {
		window.addEventListener("pointermove", updateAuraPosition);
	});

	return {aura};
}