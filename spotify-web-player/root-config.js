const { singleSpaAngularJS } = require("single-spa-angularjs");

module.exports = {
  name: "spotify-web-player",
  app: singleSpaAngularJS({
    name: "spotify-web-player",
    angular: window.angular,
    domElementGetter: () => document.getElementById("spotify-web-player"),
    mainAngularModule: "spotify-web-player",
    preserveGlobal: true,
    template: '<div id="spotify-web-player"></div>',
  }),
  activeWhen: ["/"],
  //activeWhen: ["/spotify-web-player"],
};
