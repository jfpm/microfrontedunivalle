export function prefix(location, ...prefixes) {
  return prefixes.some(
    (prefix) => location.href.indexOf(`${location.origin}/${prefix}`) !== -1
  );
}

export function nav() {
  // The nav is always active
  return true;
}

export function appAngular(location) {
  return prefix(location, "angular");
}

export function appReact(location) {
  return prefix(location, "react");
}

export function spotifyWebPlayer(location) {
  return prefix(location, "spotify-web-player");
}
