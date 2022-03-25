const $siteList = $(".siteList");
const $lastLi = $siteList.find("li.lastSite");
const xiaoming = window.localStorage.getItem("xiaoming");
const xmObject = JSON.parse(xiaoming);
const hashMap = xmObject || [
    {
        logo: "./images/acfun.jpg",
        logoType: "image",
        url: "https://www.acfun.cn/"
    },
    {
        logo: "./images/bilibili.jpg",
        logoType: "image",
        url: "https://www.bilibili.com/"
    },
    {
        logo: "./images/aiqiyi.png",
        logoType: "image",
        url: "https://www.iqiyi.com/"
    }, 
];
const render = ()=>{
    $siteList.find("li:not(.lastSite)").remove();
    hashMap.forEach((node)=>{
        const $li = $(`<li>
          <a href="${node.url}">
          <div class="site">
            <div class="logo">
                ${node.logo[0]}
            </div>
            <div class="link">${node.url}</div>
          </div>
        </a>  
          </li>`).insertBefore($lastLi);
    });
};
render();
$(".addButton").on("click", ()=>{
    let url = window.prompt("输入你的网址？？");
    if (url.indexOf("https") !== 0) url = "https://" + url;
    hashMap.push({
        logo: url[0],
        logoType: "text",
        url: url
    });
    render();
});
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap);
    window.localStorage.setItem("xiaoming", string);
};

//# sourceMappingURL=index.de158e3a.js.map
