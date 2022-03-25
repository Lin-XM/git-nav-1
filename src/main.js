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
  return url.replace("https://", "").replace("http://", "").replace("www.", "");
};
const render = () => {
  $siteList.find("li:not(.lastSite)").remove();
  hashMap.forEach((node) => {
    const $li = $(`<li>
          <a href="${node.url}">
          <div class="site">
            <div class="logo">
                ${node.logo}
            </div>
            <div class="link">${simplifyUrl(node.url)}</div>
          </div>
        </a>  
          </li>`).insertBefore($lastLi);
  });
};
render();
$(".addButton").on("click", () => {
  let url = window.prompt("输入你的网址？？");
  if (url.indexOf("https") !== 0) {
    url = "https://" + url;
  }
  hashMap.push({
    logo: simplifyUrl(url)[0].toUpperCase(),
    logoType: "text",
    url: url,
  });
  render();
});
window.onbeforeunload = () => {
  const string = JSON.stringify(hashMap);
  window.localStorage.setItem("xiaoming", string);
};
