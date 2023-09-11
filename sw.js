// mostly copied from https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

const currentCacheName = "delivered-v1.0.3";

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(currentCacheName);
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open(currentCacheName);
  await cache.put(request, response);
};

const cacheFirst = async (request) => {
  const responseFromCache = await caches.match(request);
  if (responseFromCache) {
    return responseFromCache;
  }
  const responseFromNetwork = await fetch(request);
  putInCache(request, responseFromNetwork.clone());
  return responseFromNetwork;
};

const deleteCache = async (key) => {
  await caches.delete(key);
};

const deleteOldCaches = async () => {
  const cacheKeepList = [currentCacheName];
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => ( key.match(/^delivered-v.*/) && !cacheKeepList.includes(key)) );
  await Promise.all(cachesToDelete.map(deleteCache));
};

self.addEventListener("install", (event) => {
  event.waitUntil(async () => {
    await addResourcesToCache(fileList);
    await clients.claim()
  });
});

self.addEventListener("activate", (event) => {
  event.waitUntil(Promise.all([deleteOldCaches()]));
});

self.addEventListener("fetch", (event) => {
  event.respondWith(cacheFirst(event.request));
});
const fileList = [
"./Stilu-Light.otf",
"./Stilu-LightOblique.otf",
"./Stilu-SemiBold.otf",
"./Stilu-SemiBoldOblique.otf",
"./android-chrome-192x192.png",
"./android-chrome-512x512.png",
"./apple-touch-icon.png",
"./browserconfig.xml",
"./favicon-16x16.png",
"./favicon-32x32.png",
"./favicon.ico",
"./index.html",
"./mstile-150x150.png",
"./safari-pinned-tab.svg",
"./site.webmanifest",
"./assets/Courier.aacc785a.js",
"./assets/Courier.def452ff.css",
"./assets/Default.02528026.js",
"./assets/Default.83a40549.css",
"./assets/Home.786265ac.js",
"./assets/Home.daf19aca.css",
"./assets/VContainer.9b4c590c.css",
"./assets/VContainer.ddd21cfd.js",
"./assets/VMenu.80acc9b6.css",
"./assets/VMenu.ea262fe9.js",
"./assets/_plugin-vue_export-helper.b9de9329.js",
"./assets/delivered_logo.a2e0386b.png",
"./assets/heading.0547b151.css",
"./assets/heading.4e27d137.js",
"./assets/index.1d31b8c9.css",
"./assets/index.4c39f74e.js",
"./assets/materialdesignicons-webfont.48d3eec6.woff",
"./assets/materialdesignicons-webfont.861aea05.eot",
"./assets/materialdesignicons-webfont.bd725a7a.ttf",
"./assets/materialdesignicons-webfont.e52d60f6.woff2",
];