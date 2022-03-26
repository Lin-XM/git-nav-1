const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.lastSite");
const xiaoming = window.localStorage.getItem("xiaoming");
const xmObject = JSON.parse(xiaoming);
const hashMap = xmObject || [
  {
    logo: "A",
    // logo: "./images/acfun.jpg",
    // logoType: "image",
    url: "https://www.acfun.cn",
  },
  {
    logo: "B",
    // logo: "./images/bilibili.jpg",
    // logoType: "image",
    url: "https://www.bilibili.com",
  },
  {
    logo: "Q",
    // logo: "./images/aiqiyi.png",
    // logoType: "image",
    url: "https://www.iqiyi.com",
  },
];
const simplifyUrl = (url) => {
  return url
    .replace("https://", "")
    .replace("http://", "")
    .replace("www.", "")
    .replace(/\/.*/, "");
};
const render = () => {
  $siteList.find("li:not(.lastSite)").remove();
  hashMap.forEach((node, index) => {
    const $li = $(`
        <li>

            <div class="site">
            <div class="logo">${node.logo}</div>
            <div class="link">${simplifyUrl(node.url)}</div>
              <div class="close">
                <svg class="icon">
                  <use xlink:href="#icon-close"></use>
                </svg>
              </div>
            </div>
        </li>`).insertBefore($lastLi);
    $li.on("click", () => {
      // 代替 a 标签
      window.open(node.url);
    });
    $li.on("click", ".close", (e) => {
      e.stopPropagation(); // 阻止冒泡
      hashMap.splice(index, 1); // 删除对应下标的图标
      render();
    });
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("输入你的网址？？");
  if (url === "") {
    window.alert("你输入的网址为空！！");
  }else if (url[0] === " ") {
    window.alert("你输入的网址不合法！！");
  }else {
    if (url.indexOf("https") !== 0) {
      url = "https://" + url;
    }
    hashMap.push({
      logo: simplifyUrl(url)[0].toUpperCase(),
      logoType: "text",
      url: url,
    });
    render();
  }
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  window.localStorage.setItem("xiaoming", string);
};

$(document).on("keypress", (e) => {
  const key = e.key;
  for (let i = 0; i < hashMap.length; i++) {
    if (hashMap[i].logo.toLowerCase() === key) {
      window.open(hashMap[i].url);
    }
  }
});
