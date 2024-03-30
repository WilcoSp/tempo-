# Tempo not splitting test

this repo is to show Tempo not being able to split when using Vite

this repo is set up to build 2 Vue apps with a `format` & `parse` components (dist/without) & a version where also `yearStart` (dist/with) is used in a sfc file that would be included to the main
index.js file

I've included in this repo both apps prebuild

# what I've noticed for now

1. Vite doesn't attempt to split Tempo to have functions only included where they're used (in the case of the 'with' build)
2. Because of ^, if a function of Tempo gets included to the main compiled index.js it'll included other used functions from tempo
3. But if Tempo gets used in multiple files/components that won't be in the main index.js file it'll be separated into it's own js file. (if only used 1 file, it'll be bundled into that file)

# What I've observed from the main project that caused me testing this

in the main project where I noticed Tempo wasn't able to split was when I checked the Rollup visualizer that more packages have the issue of not being split, 1 of them being Vueuse.

But at least the 2 packages I saw were able to split were Date-fns & Lodash-es.

When I compared [Tempo](https://www.npmjs.com/package/@formkit/tempo?activeTab=code) & [Vueuse](https://www.npmjs.com/package/@vueuse/core?activeTab=code) to
[Date-fns](https://www.npmjs.com/package/date-fns?activeTab=code) & [lodash-es](https://www.npmjs.com/package/lodash-es?activeTab=code) at NPMjs.com I noticed that Tempo & Vueuse have everything
bundled into 1 index.js while Date-fns & Lodash-es use index.js to only export everything but have most things still in separated files.

Based on ^ is my theory it's maybe best for packages to not bundle everything into 1 index.js file but to keep all code separated (like in development) to allow Vite & other bundlers to decide how to
bundle a package in a more efficient way with the code of the developer.

# Test with a fork that doesn't bundle Tempo

After creating a [fork](https://github.com/WilcoSp/tempo-split) of Tempo, I've changed the build settings so it won't bundle everything into 1 index.mjs file but separate files with help of an esbuild
plugin. Than I created versions of the `format` & `parse` components using the fork + adding `yearStart` from the fork to the with version.

After building both versions my observations were confirmed. To allow for Tempo and other packages to be code splitable by Vite & other bundlers it's best to not bundle for npm or other js registries.
If a package should also be available via cdn it's than better to build a separate bundle.js or cdn.js and at set `browser`, `unpkg` and/or `jsdelivr` (or under `exports` object) to the bundle.js or
cdn.js file instead of index.js

edit: Because commonjs isn't at least by Vite isn't used and probably Node.js & other backend runtimes import everything is it still an option to bundle commonjs, depending on the transpiler the
commonjs code could become bigger even.

# Final words

With these tests I'll update my [fork](https://github.com/WilcoSp/tempo-split) of Tempo so it'll be ready to be merged into Tempo and hopefully be included in a future release.

With these tests I've and hopefully others that read this have learned a lot about how Vite & other bundlers handle pre/unbundled packages when bundling a js app.

# build/dev commands

after installing all dependencies these build/dev are available

(pnpm is used here, but npm/yarn should work too)

## For without `startYear`

dev: `pnpm run dev:without`

build: `pnpm run build:without`

## For with `startYear`

dev: `pnpm run dev:with`

build: `pnpm run build:with`

### **!! the with & without commands cannot be used at the same time due to sharing an index.html and some components !!**
