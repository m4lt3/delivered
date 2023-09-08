// mostly copied from https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers

const currentCacheVersion = "v1.0.2";

const addResourcesToCache = async (resources) => {
  const cache = await caches.open(currentCacheVersion);
  await cache.addAll(resources);
};

const putInCache = async (request, response) => {
  const cache = await caches.open(currentCacheVersion);
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
  const cacheKeepList = [currentCacheVersion];
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
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
"./assets/Courier.6781914c.js",
"./assets/Courier.def452ff.css",
"./assets/Default.3da96cbd.js",
"./assets/Default.83a40549.css",
"./assets/Home.29f2632f.js",
"./assets/Home.daf19aca.css",
"./assets/VContainer.9b4c590c.css",
"./assets/VContainer.e38ad402.js",
"./assets/VMenu.0d8841cc.js",
"./assets/VMenu.80acc9b6.css",
"./assets/_plugin-vue_export-helper.a03f6180.js",
"./assets/delivered_logo.a2e0386b.png",
"./assets/heading.0547b151.css",
"./assets/heading.b63df6f7.js",
"./assets/index.1d31b8c9.css",
"./assets/index.71436e4c.js",
"./assets/materialdesignicons-webfont.48d3eec6.woff",
"./assets/materialdesignicons-webfont.861aea05.eot",
"./assets/materialdesignicons-webfont.bd725a7a.ttf",
"./assets/materialdesignicons-webfont.e52d60f6.woff2",
];
