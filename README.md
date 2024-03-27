# Tempo not splitting test

this repo is to show Tempo not being able to split when using Vite

this repo is set up to build 2 Vue apps with a `format` & `parse` components (dist/without) & a version where also `yearStart` (dist/with) is used in a sfc file that would be included to the main
index.js file

I've included in this repo both apps prebuild

# what I've noticed for now

1. Vite doesn't attempt to split Tempo to have functions only included where they're used (in the case of the 'with' build)
2. Because of ^, if a function of Tempo gets included to the main compiled index.js it'll included other used functions from tempo
3. But if Tempo gets used in multiple files/components that won't be in the main index.js file it'll be separated into it's own index.js file. (if only used 1 file, it'll be bundled into that file)

# What I've observed from the main project that caused me testing this

in the main project where I noticed Tempo wasn't able to split was when I checked the Rollup visualizer that more libraries have the issue of not being split, 1 of them being Vueuse.

But at least the 2 libraries I saw were able to split were Date-fns & Lodash-es.

When I compared [Tempo](https://www.npmjs.com/package/@formkit/tempo?activeTab=code) & [Vueuse](https://www.npmjs.com/package/@vueuse/core?activeTab=code) to
[Date-fns](https://www.npmjs.com/package/date-fns?activeTab=code) & [lodash-es](https://www.npmjs.com/package/lodash-es?activeTab=code) at NPMjs.com I noticed that Tempo & Vueuse have everything
bundled into 1 index.js while Date-fns & Lodash-es use index.js to only export everything but have most things still in separated files.

Based on ^ is my theory it's maybe best for libraries to not bundle everything into 1 index.js file but to keep all code separated (like in development) to allow Vite & other bundlers to decide how to
bundle a library in a more efficient way with the code of the developer.

# 1 more test coming

I plan to temporary fork Tempo to create a version that isn't bundled to see if their will be a difference, this will happen in the weekend due to also needing to do other things

# build/dev commands

after installing all dependencies these build/dev are available

(pnpm is used here, but npm/yarn should work too)

## for without `startYear`

dev: `pnpm run dev:without`

build: `pnpm run build:without`

## for with `startYear`

dev: `pnpm run dev:with`

build: `pnpm run build:with`

### **!! the with & without commands cannot be used at the same time due to sharing an index.html and some components !!**
