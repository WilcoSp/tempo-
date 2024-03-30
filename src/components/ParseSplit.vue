<script setup lang="ts">
import { computed, ref } from "vue";
import WelcomeItem from "./WelcomeItem.vue";
import { parse } from "@wilcosp/formkit-tempo";

const options = ["1996-02-27", "2022-01-28", "2006/09/28", "2013.10.12"];
const current = ref(options[0]);
const format = "YYYY MM DD";

const parsed = computed(() => parse(current.value, format));
</script>

<template>
	<WelcomeItem>
		<template #heading>Parse split (YYYY MM DD formatted)</template>
		<select name="locale" v-model="current" style="width: 10rem">
			<option v-for="option of options" :value="option" :key="option">{{ option }}</option>
		</select>
		<p>result: {{ parsed }}</p>
	</WelcomeItem>
</template>
