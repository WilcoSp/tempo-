<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import { defineAsyncComponent } from "vue";
import { yearStart as yearStartOG } from "@formkit/tempo";
import { yearStart as yearStartSplit } from "@wilcosp/formkit-tempo";
const FormatComp = defineAsyncComponent(() => import("./FormatComp.vue"));
const FormatSplit = defineAsyncComponent(() => import("./FormatSplit.vue"));
const ParseComp = defineAsyncComponent(() => import("./ParseComp.vue"));
const ParseSplit = defineAsyncComponent(() => import("./ParseSplit.vue"));
</script>

<template>
	<FormatComp></FormatComp>
	<FormatSplit></FormatSplit>
	<ParseComp></ParseComp>
	<ParseSplit></ParseSplit>
	<WelcomeItem>startYear original: {{ yearStartOG(new Date()) }} </WelcomeItem>
	<WelcomeItem>startYear split: {{ yearStartSplit(new Date()) }} </WelcomeItem>
</template>
