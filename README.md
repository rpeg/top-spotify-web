# Spotify Data Visualizer (Frontend)

React frontend client for Spotify data visualizer. Makes async requests to Express server:  [top-spotify-node](https://github.com/scjohnson16/top-spotify-node)

## Features

* Display your top artists, tracks, genres and assorted statistics for three time ranges
* Map your top artists by country on a global projection
* Customizable chart settings: variable display counts, optional sections, data optimization
* Rendered natively in browser, with export to PNG

## Specs

* One-directional state management via `redux`
* Async requests via `axios`
* Establishes socket with Express server via `socket.io`
* Responsive layout via `react-bootstrap`
* Dynamic, optimized colors via `google-palette`
* Tested with `jest` and `enzyme`
* Allows for DOM->PNG exports via `dom-to-image`
* ES6 syntax; airbnb code style

## Example

![alt text](https://i.imgur.com/O8kYWzu.png)
