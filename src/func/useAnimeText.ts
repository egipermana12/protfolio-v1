import {ref} from 'vue';

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export function useAnimeText(original: string, speed: 30) {
	const text = ref(original);

	const animeText = () => {
		let iteration = 0;

		const interval = setInterval(() => {
			text.value = original.split("").map((char, index) => {
				if(index < iteration) return original[index];
				return letters[Math.floor(Math.random() * letters.length)];
			}).join("");
			iteration += 1/2;
			if (iteration >= original.length) clearInterval(interval);
		}, speed);
	}
	return {text, animeText}
}