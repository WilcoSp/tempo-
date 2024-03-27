<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import { defineAsyncComponent } from "vue";
const FormatComp = defineAsyncComponent(() => import("./FormatComp.vue"));
const ParseComp = defineAsyncComponent(() => import("./ParseComp.vue"));
</script>

<template>
	<FormatComp></FormatComp>
	<ParseComp></ParseComp>
	<WelcomeItem> . </WelcomeItem>
</template>
