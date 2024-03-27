<script setup lang="ts">
import WelcomeItem from "./WelcomeItem.vue";
import { defineAsyncComponent } from "vue";
import { yearStart } from "@formkit/tempo";
const FormatComp = defineAsyncComponent(() => import("./FormatComp.vue"));
const ParseComp = defineAsyncComponent(() => import("./ParseComp.vue"));
</script>

<template>
	<FormatComp></FormatComp>
	<ParseComp></ParseComp>
	<WelcomeItem>startYear: {{ yearStart(new Date()) }} </WelcomeItem>
</template>
