
siteMapOpen();
searchBoxOpen();
fixedHeader();
scrollTopBtn();
siteSelect();

window.addEventListener('scroll', function(){
  let windowTop = Math.floor(window.scrollY || document.documentElement.scrollTop);
  fixedHeader(windowTop);
  scrollTopBtn(windowTop);
  brandTitleMoveSection(windowTop)
  // WheelingBrandTitleMove(windowTop);
});


//title slide 
new Swiper('#title .swiper-container', {
  effect: 'fade',
  autoplay: true,
  pagination: {
    el: '#title .swiper-pagination',
    clickable: true,
  },
  navigation: {
    nextEl: '#title .swiper-button-next',
    prevEl: '#title .swiper-button-prev',
  },
  observer: true,
  observeParents: true,
});

//nav slide
new Swiper('.nav_slide.swiper-container', {
  effect: 'fade',
  autoplay: true,
  pagination: {
    el: '.nav_slide .swiper-pagination',
    clickable: true,
  },
  observer: true,
  observeParents: true,
});

//brand srory slide
new Swiper('#brand_story .swiper-container', {
  autoplay: true,
  loop: true,
  pagination: {
    el: '#brand_story .swiper-pagination',
    clickable: true,
  },
  observer: true,
  observeParents: true,
});

// experience slide 
new Swiper('#experience .swiper-container', {
  autoplay: true,
  loop: true,
  navigation: {
    nextEl: '#experience .swiper-button-next',
    prevEl: '#experience .swiper-button-prev',
  },
  observer: true,
  observeParents: true,
});


//brand_material 버블 애니메이션
let bubble = document.getElementsByClassName("bubble");
let brand_material = document.getElementById("brand_material");
let bubbleBox = brand_material.getElementsByTagName("a");
let random;
let random2;

let bubleAni = function(){
  let count = bubble.length;
  if(count >= 13){
    while (bubbleBox.lastChild) {
      bubbleBox.removeChild(bubbleBox.lastChild);
    }
  } else{
    for(let i = 0; i < bubbleBox.length; i++){
      let bubbleCoby = bubble[0].cloneNode();
      random = Math.floor(Math.random()*100) + 1;
      random2 = Math.floor(Math.random()*200 + Math.random()*10);

      bubbleBox[i].appendChild(bubbleCoby);

      bubble[i].style.transform = `translateY(${random2}px)`;
      bubble[i].style.left = `${random}%`;
    }
  }
}
setInterval(bubleAni, 1000);


//스크롤시 header 배경변경
function fixedHeader(win) {
  let header = document.getElementsByTagName("header")[0];
  let header_h = header.offsetHeight;

  if (win >= header_h) {
    header.classList.add("ch_header");
  } else {
    header.classList.remove("ch_header");
  }
}

//sitemap 버튼 클릭시 사이트맵 나옴
function siteMapOpen() {
  let siteBtn = document.getElementsByClassName("site_map")[0];
  let siteMap = document.getElementsByTagName("nav")[0];
  let body = document.getElementsByTagName("body")[0];
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
}

//검색영역 나옴
function searchBoxOpen() {
  let searhBtn = document.getElementsByClassName("search_btn")[0];
  let searhBox = document.getElementsByClassName("search_box")[0];
  let closeBtn = searhBox.getElementsByClassName("close")[0];
  searhBtn.addEventListener("click", function () {
    this.removeAttribute("href");
    searhBox.classList.add("current");
  });
  closeBtn.addEventListener("click", function () {
    searhBox.classList.remove("current");
  });
}

//top 버튼 클릭시 스크롤, 영역진입 화살표 rotation, 아래로 스크롤
function scrollTopBtn(winT) {
  let topBtn = document.getElementsByClassName("scroll_top")[0];
  let ch_point = document.getElementById("experience").offsetTop;
  let moveDown = document.getElementById("best_sellers").offsetTop;
  let header = document.getElementsByTagName("header")[0];
  let header_h = header.offsetHeight;

  topBtn.addEventListener("click", function () {
    window.scrollTo({top: 0, behavior: "smooth"});
  });

  if (winT >= ch_point) {
    topBtn.classList.add("fixed");
  } else {
    topBtn.classList.remove("fixed");
  }

  if (winT == 0) {
    topBtn.classList.add("rotate");
    topBtn.addEventListener("click", function () {
      scrollTo({top: moveDown - header_h,behavior: "smooth"});
    });
  } else {
    topBtn.classList.remove("rotate");
  }

}

//사이트 셀랙트 토글
function siteSelect() {
  let siteBtn = document.getElementsByClassName("site")[0];
  siteBtn.addEventListener("click", function () {
    siteBtn.classList.toggle("current");
  });

}

//remove class function
function reset(content, className) {
  Array.from(content).forEach(element => {
    element.classList.remove(className);
  });
}


//Brand story mouse wheel event
const brandTitle = document.querySelector('.brand-story-title');
let size = 1;

function WheelingBrandTitleMove(event) {
  event.preventDefault();
  console.log(event.deltaY)
  size += event.deltaY * -1;

  size = Math.min(Math.max(-500, size), 100);
  brandTitle.style.transform = `translateX(${size}px)`;
}

function brandTitleMoveSection(winTop) {
  let brandTop = document.getElementById('brand_story').offsetTop;
  let brandHeight = document.getElementById('brand_story').offsetHeight;
  brandTop = brandTop - (brandTop/4);
  console.log(brandTop);
  if(winTop >= brandTop && winTop < winTop + brandHeight) {
    WheelingBrandTitleMove();
  }
}
window.addEventListener('wheel', WheelingBrandTitleMove, true);



