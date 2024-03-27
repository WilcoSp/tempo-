<script setup lang="ts">
import { computed, ref } from "vue";
import WelcomeItem from "./WelcomeItem.vue";
import { format } from "@formkit/tempo";

const locales = ["en-US", "nl", "de", "es"];
const current = ref(locales[0]);

const today = new Date();
const formatted = computed(() => format(today, { date: "long" }, current.value));
</script>

<template>
	<WelcomeItem>
		<template #heading>Format</template>
		<select name="locale" v-model="current" style="width: 5rem">
			<option v-for="loc of locales" :value="loc" :key="loc">{{ loc }}</option>
		</select>
		<p>result: {{ formatted }}</p>
	</WelcomeItem>
</template>
