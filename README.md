# Systems Offline
A tiny Metroidvania.

Oh no, Gib’s systems went offline!
Help him regain his abilities by collecting items to bring them back online.
But watch out for hazards along the way!

[Launch dev build](https://rawgit.com/attilahorvath/systems-offline/master/index.html)

Originally created for the [js13kGames](http://js13kgames.com) competition in
2018. The theme was 'offline'.

## Controls (none of them are available at the start)
- Arrows / WASD / Gamepad analog stick - Move
- X / K / Gamepad A button - Jump
- Z / J / Gamepad B button - Shoot / Drill when pushing against bricks

## Compatibility
The game has been tested successfully in the current versions of
Chrome, Firefox, Opera, Safari and Edge on Linux, Windows and macOS.

For gamepad compatibility, the PowerA Nintendo Switch Wired Controller and
THEC64 Mini Joystick was tested.

## Development
Install dependencies:

```sh
$ npm install
```

Build the bundle:

```sh
$ npm run build
```

Or watch for changes and automatically rebuild:

```sh
$ npm run watch
```

Serving the game locally requires a web server, otherwise e.g. Chrome refuses to
load the images. I was using `local-web-server` for this purpose.

To install:

```sh
$ npm install --global local-web-server
```

Then run:

```sh
$ ws
```

The game will then be served at: http://localhost:8000
