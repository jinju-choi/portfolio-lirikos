// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/main.js":[function(require,module,exports) {
siteMapOpen();
searchBoxOpen();
fixedHeader();
scrollTopBtn();
siteSelect();
sellerImgChange(); //dotClickSlide();

window.onscroll = function () {
  var winTop = Math.floor(window.scrollY || document.documentElement.scrollTop);
  fixedHeader(winTop);
  scrollTopBtn(winTop); //brandTitleMove(winTop);
  //console.log(winTop);
  //wheelMove();

  wheelScoll(winTop);
};

setInterval(bubleAni, 2000); //setInterval(slide, 500);
//title slide 

new Swiper('#title .swiper-container', {
  effect: 'fade',
  autoplay: true,
  pagination: {
    el: '#title .swiper-pagination',
    clickable: true
  },
  navigation: {
    nextEl: '#title .swiper-button-next',
    prevEl: '#title .swiper-button-prev'
  }
}); //nav slide

new Swiper('.nav_slide.swiper-container', {
  effect: 'fade',
  autoplay: true,
  pagination: {
    el: '.nav_slide .swiper-pagination',
    clickable: true
  }
}); //brand srory slide

new Swiper('#brand_story .swiper-container', {
  autoplay: true,
  loop: true,
  pagination: {
    el: '#brand_story .swiper-pagination',
    clickable: true
  }
}); // experience slide 

new Swiper('#experience .swiper-container', {
  autoplay: true,
  loop: true,
  navigation: {
    nextEl: '#experience .swiper-button-next',
    prevEl: '#experience .swiper-button-prev'
  }
}); //brand_material 버블 애니메이션

var bubble = document.getElementsByClassName("bubble");
var brand_material = document.getElementById("brand_material");
var bubbleBox = brand_material.getElementsByTagName("a");
var random;
var random2;

var bubleAni = function bubleAni() {
  var count = bubble.length;

  if (count >= 12) {
    while (bubbleBox.lastChild) {
      bubbleBox.removeChild(bubbleBox.lastChild);
    }
  } else {
    for (var i = 0; i < bubbleBox.length; i++) {
      var clone = bubble[0].cloneNode();
      random = Math.floor(Math.random() * 100) + 1;
      random2 = Math.floor(Math.random() * 200 + Math.random() * 10);
      bubbleBox[i].appendChild(clone);
      bubble[i].style.transform = "translateY(".concat(random2, "px)");
      bubble[i].style.left = "".concat(random, "%");
    }
  }
}; //스크롤시 header 배경변경


function fixedHeader(win) {
  var header = document.getElementsByTagName("header")[0];
  var header_h = header.offsetHeight;

  if (win >= header_h) {
    header.classList.add("ch_header");
  } else {
    header.classList.remove("ch_header");
  }
} //sitemap 버튼 클릭시 사이트맵 나옴


function siteMapOpen() {
  var siteBtn = document.getElementsByClassName("site_map")[0];
  var siteMap = document.getElementsByTagName("nav")[0];
  var body = document.getElementsByTagName("body")[0];
  siteBtn.addEventListener("click", function () {
    siteBtn.removeAttribute("href");

    if (this.classList.contains("current")) {
      this.classList.add("remove");
      siteMap.classList.remove("current");
      this.classList.remove("current");
      body.style.overflow = "";
    } else {
      this.classList.add("current");
      siteMap.classList.add("current");
      this.classList.remove("remove");
      body.style.overflow = "hidden";
    }
  });
} //검색영역 나옴


function searchBoxOpen() {
  var searhBtn = document.getElementsByClassName("search_btn")[0];
  var searhBox = document.getElementsByClassName("search_box")[0];
  var closeBtn = searhBox.getElementsByClassName("close")[0];
  searhBtn.addEventListener("click", function () {
    this.removeAttribute("href");
    searhBox.classList.add("current");
  });
  closeBtn.addEventListener("click", function () {
    searhBox.classList.remove("current");
  });
} //top 버튼 클릭시 스크롤, 영역진입 화살표 rotation, 아래로 스크롤


function scrollTopBtn(winT) {
  var topBtn = document.getElementsByClassName("scroll_top")[0];
  var ch_point = document.getElementById("experience").offsetTop;
  var moveDown = document.getElementById("best_sellers").offsetTop;
  var header = document.getElementsByTagName("header")[0];
  var header_h = header.offsetHeight;
  topBtn.addEventListener("click", function () {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });

  if (winT >= ch_point) {
    topBtn.classList.add("fixed");
  } else {
    topBtn.classList.remove("fixed");
  }

  if (winT == 0) {
    topBtn.classList.add("rotate");
    topBtn.addEventListener("click", function () {
      scrollTo({
        top: moveDown - header_h,
        behavior: "smooth"
      });
    });
  } else {
    topBtn.classList.remove("rotate");
  }
} //사이트 셀랙트 토글


function siteSelect() {
  var siteBtn = document.getElementsByClassName("site")[0];
  siteBtn.addEventListener("click", function () {
    siteBtn.classList.toggle("current");
  });
}

function sellerImgChange() {
  var bestSeller = document.getElementById("best_sellers");
  var sellerList = bestSeller.getElementsByTagName("li");
  var hover = "hover";
  var no = "";
  Array.from(sellerList).forEach(function (element, index) {
    element.addEventListener("mouseenter", function () {
      var img = element.getElementsByTagName("img")[0];
      var getSrc = img.src;
      var ch_img = getSrc.replace("img", hover); //let hov = ch_img.replace("http://localhost:1234", no);
      //img.src = hov;

      var ch = document.createElement('img');
      element.appendChild(ch);
      element.children[0].setAttribute("src", ch_img);
    });
  });
}

var title = document.getElementById("title");
var nextBtn = title.getElementsByClassName("right")[0];
var prevBtn = title.getElementsByClassName("left")[0];
var slideCount = title.getElementsByClassName("slide_count")[0];
var slideBtn = slideCount.getElementsByTagName("button");
var title_dot = title.getElementsByClassName("slide_btn")[0].getElementsByTagName("li");
var dot = title_dot.length;
var slideList = document.getElementsByClassName("title_slide")[0].children;
var currentIndex = 0;
var num = 0;
nextBtn.addEventListener("click", function () {
  if (currentIndex == dot) {
    currentIndex + 1;
  } else {
    currentIndex - 1;
  }
});

function reset(content, className) {
  Array.from(content).forEach(function (element) {
    element.classList.remove(className);
  });
}

var brandStory = document.getElementById("brand_story");
var brandTop = Math.floor(brandStory.offsetTop);
var brandTitle = brandStory.getElementsByTagName('h2')[0];
var body = document.body;
var html = document.documentElement;
var winHeight = Math.max(body.scrollHeight, body.offsetHeight, html.clientHeight, html.scrollHeight, html.offsetHeight);
var brandstorySlide = 0;
brandTop = brandTop - winHeight;
console.log('Height:' + winHeight);
console.log('brandTop:' + brandTop);
document.addEventListener("wheel", wheelMove, false);

function wheelMove(e) {
  e.preventDefault();
  var delta = e.detail * 2;
}

var prevPosition = 0; // 스크롤방향

function wheelScoll(wiT) {
  initPosition = wiT;

  if (wiT >= brandTop && wiT <= brandTop + winHeight) {
    if (initPosition > prevPosition) {
      // 스크롤방향
      delta = -12;
      brandstorySlide -= delta; // 스크롤방향n

      brandTitle.style.right = "".concat(brandstorySlide, "px");
    } else {
      delta = +12;
      brandstorySlide -= delta; // 스크롤방향n

      brandTitle.style.right = "".concat(brandstorySlide, "px");
    }

    prevPosition = initPosition;
  }

  console.log(brandstorySlide);
}
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "63539" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map