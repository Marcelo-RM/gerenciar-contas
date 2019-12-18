if (navigator.serviceWorker.controller) {
    console.log("[PWA BUILDER] active service worker found, no need to register");
} else {
    navigator.serviceWorker.register("pwabuilder-sw.js", {
        scope: "./"
    }).then(reg => {
        console.log("service worker has been registred for scope: " + reg.scope);
    })
}