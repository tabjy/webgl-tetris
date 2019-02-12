# README  

This assignment is tested on Google Chrome 72.0.3626.81 and Firefox 65.0. This should, theoretically, work on all modern browsers, but just try not to grade this on IE.

## Before You Grade

**Opening `index.html` directly from file system will *NOT* work!**

For this assignment, Webpack is used to package and transpile JavaScript source code as manually manage and integrate over 10 source modules can be problematic. In addition, shader sources are loaded asynchronously with `window.fetch()` function, which requires remote resources being hosted on a HTTP server. To correctly open this assignment, follow the instruction below.

### Using Pre-built `dist`

The source codes in `src` directory are pre-built to `dist` directory, included with this submission. The entry point is `dist/index.html`. Please set up a simple HTTP server on `localhost`:

```
$ cd dist
$ python3 -m http.server
```

Then open your browser and navigate to [http://localhost:8000](http://localhost:8000).

### Build from Source

Alternatively, you can build from source. This requires you to have `node` and `npm` installed.

```
$ npm install
$ npm run build
```

Then follow instructions in the previous section.

Or, run

```
$ npm install
$ npm run dev
```

to start a Webpack local development server on [http://localhost:8080](http://localhost:8080).

If you have any problem with running my assignment, please contact me at [arvinx@sfu.ca](mailto:arvinx@sfu.ca).

## Features

### Required Features

All features documented in assignment description, namely,
- tile and grid rendering and tile downward movement
- tile stack-up
- key stroke interaction and tile movements
- additional game logic

### Extra features/works

In addition to required features, efforts are put into followings,
- an Unity3D-like scripting runtime API, with classes `AssetManager`, `Behavior`, `Color`, `Component`, `Game`, `GameObject`, `Mesh`, `Renderer`, `Transform`, and `Vector2`, located under `src/runtime`.
	- `AssetManager`: loads remote asssets asynchronously
	- `GameObject`:  servers multiple purposes by attaching with different `Component` classes, which inherent from:
		- `Behavior`: provides `onStart`, `onUpdate`, `onLateUpdate`, `onFixedUpdate` scripting interfaces
		- `Mesh`: defines vertices and faces for that will be passed to shaders, converts local `Transforms` to WebGL clip coordinates
		- `Renderer`: takes vertices positions from a `Mesh` and populate WebGL buffers, executes shaders
		- `Transform`: defines relative transformation to its parent, supports position, scaling, the rotation, `GameObject`s with their transforms being decedents of `Game.world.transform` would be rendered.
	- `Color`: defines an `RGBA` color.
	- `Vector2`: represents a 2D vector with algebra functions.
	- This runtime is theoretically sufficient for any 2D presentation.
- an FPS counter
- display of current game information:
	- game state: `GameLogic.STATES.READY`, `GameLogic.STATES.PLAYING`, or `GameLogic.STATES.GAME_OVER`
	- preview of next tile, and the name
- scores: current and high score
- alternative tile falling mode: discrete or continuous
- adjustable falling velocity
- a button to start/restart the game

## 3rd-Party Codes

All 3rd-part codes are development-dependencies, and mostly used for Webpack packaging/integration. No 3rd-party codes are required at run time. No 3rd-part code is related to rendering, 2D transformations, linear algebra, or game logic. For a comprehensive list of these 3-rd party modules, please see `package.json`.

**I claim full ownership of all code that's running while grading.**
