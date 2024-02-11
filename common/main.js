function t() {return document.getElementById("searchInput").value;}

document.getElementById("buttons").addEventListener("click", (event) => {
	if (event.target.tagName === "BUTTON") {
		var methodName = event.target.innerText;
		// 将一个变量名为 `methodName` 的方法作为字符串参数传递给 `window` 对象，并将 `window` 中与该方法同名的属性赋给 `searchMethod` 变量。换句话说，`searchMethod` 将成为一个指向 `window` 对象的属性的引用，该属性的名称与 `methodName` 变量的值相同。通过这种方式，可以动态地从 `window` 对象中获取方法，并将其存储在变量中以供后续使用。
		var searchMethod = window[methodName];
		if (typeof searchMethod === "function") {
			searchMethod();
		} else {
			console.log("找不到与按钮文本匹配的方法");
		}
	}
});

function defaultSearch() {location.href = "https://www.baidu.com/s?wd=" + t();}
function 豆瓣(){location.href="https://www.douban.com/search?q="+t();}
function 百度贴吧(){location.href="https://tieba.baidu.com/f?ie=utf-8&kw="+t();}
function 音乐下载_磁场(){location.href="https://www.hifini.com/search-"+t()+".htm";}
function 音乐_酷狗(){location.href="https://www.kugou.com/yy/html/search.html#searchType=song&searchKeyWord="+t();}
function 音乐_酷我(){location.href="http://www.kuwo.cn/search/list?key="+t();}
function 音乐_网易云(){location.href="https://music.163.com/#/search/m/?s="+t();}
function 诗歌_敬拜者(){location.href="https://jingbaizhe.net/search/songs/"+t();}
function 诗歌_赞美之门(){location.href="https://zan.igoodtv.com/search.html?keyword="+t();}
function 诗歌_爱赞美(){location.href="https://www.zanmei.ai/search/song/"+t();}
function 知乎(){location.href="https://www.zhihu.com/search?type=content&q="+t();}
function Bilibili(){location.href="https://search.bilibili.com/all?keyword="+t();}
function Bing() {location.href = "https://cn.bing.com/search?q=" + t();}
function 歌词网(){location.href="https://www.90lrc.cn/so.php?wd="+t();}
function 酷歌词(){location.href="https://www.kugeci.com/search?q="+t();}
function 吾爱破解(){location.href="http://zhannei.baidu.com/cse/site?q="+t()+"&click=1&cc=52pojie.cn&s=&nsid=";}
function 淘宝(){location.href="https://s.taobao.com/search?q="+t();}
function 京东(){location.href="https://search.jd.com/Search?keyword="+t();}
function 下厨房(){location.href="http://www.xiachufang.com/search/?keyword="+t();}
function 古诗文网(){location.href="https://so.gushiwen.cn/search.aspx?value="+t();}
function LeetCode(){location.href="https://leetcode.cn/circle/?query="+t();}
function BOSS直聘(){location.href="https://www.zhipin.com/job_detail/?query="+t();}
function 智联招聘(){location.href="https://sou.zhaopin.com/?jl=750&kw="+t();}
function 掘金(){location.href="https://juejin.cn/search?query="+t();}
function Down423(){location.href="https://www.423down.com/?s="+t();}
function 搜狗(){location.href="https://www.sogou.com/web?query="+t();}
function 搜狗_微信文章(){location.href="https://weixin.sogou.com/weixin?type=2&query="+t();}
function GreasyFork(){location.href="https://greasyfork.org/zh-CN/scripts?sort=updated&q="+t();}
function API搜索(){location.href="https://cn.bing.com/search?q=site%3Aapiref.com+"+t();}
function MBA智库百科(){location.href="https://wiki.mbalib.com/wiki/Special:Search?search="+t();}
function 欧路翻译(){location.href="https://dict.eudic.net/dicts/en/"+t();}
function 有道翻译(){location.href="http://dict.youdao.com/w/"+t();}
function 菜鸟教程(){location.href="https://www.runoob.com/?s="+t();}
function 程序员工具箱(){location.href="https://tool.lu/search/?query="+t();}
function Github(){location.href="https://github.com/search?q="+t();}
function 天眼查(){location.href="https://www.tianyancha.com/search?key="+t();}
function 企查查(){location.href="https://www.qcc.com/web/search?key="+t();}
function 爱企查(){location.href="https://aiqicha.baidu.com/s?q="+t();}
function 汉典(){location.href="https://www.zdic.net/hans/"+t();}
function 果壳(){location.href="https://www.ghxi.com/?s="+t();}
function 人人都是产品经理(){location.href="http://api.woshipm.com/search/list.html?key="+t();}
function MDNWebDocs(){location.href="https://developer.mozilla.org/zh-CN/search?q="+t();}
function 书栈网(){location.href="https://www.bookstack.cn/search/result?wd="+t();}
function Maven仓库(){location.href="https://central.sonatype.com/search?q="+t();}
function mefcl(){location.href="https://www.mefcl.com/?s="+t();}
function 吉他17(){location.href="http://www.17jita.com/search.php?mod=portal&searchid=255&searchsubmit=yes&kw="+t();}
function 好大夫在线(){location.href="https://so.haodf.com/index/search?kw="+t();}
function 春雨医生(){location.href="https://www.chunyuyisheng.com/pc/search/?query="+t();}
function CODELF(){location.href="https://unbug.github.io/codelf/#"+t();}
function 小米商城(){location.href="https://www.mi.com/shop/search?keyword="+t();}
function 虎嗅(){location.href="https://m.huxiu.com/search?s="+t();}
function Dictionary(){location.href="https://www.dictionary.com/browse/"+t();}
function etymOnline(){location.href="https://www.etymonline.com/search?q="+t();}
function thefreedictionary(){location.href="https://www.thefreedictionary.com/"+t();}
function LongMan(){location.href="https://www.ldoceonline.com/dictionary/"+t();}
// VPN
function _微读圣经(){location.href="https://wd.bible/search?qs="+t();}
function _维基百科(){location.href="https://zh.wikipedia.org/w/index.php?search="+t();}
function _Chrome插件(){location.href="https://chrome.google.com/webstore/search/"+t();}
function _Google(){location.href="https://www.google.com/search?q="+t();}
function _V2EX(){location.href="https://www.google.com/search?q=site:v2ex.com/t%20"+t();}
function _YouTube(){location.href="https://www.youtube.com/results?search_query="+t();}
function _YouTube_Music(){location.href="https://music.youtube.com/search?q="+t();}
function _Spotify(){location.href="https://open.spotify.com/search/"+t();}
function _Docker_Hub(){location.href="https://hub.docker.com/search?type=image&q="+t();}
function _APKPure(){location.href="https://apkpure.com/search?q"+t();}
function _维基词典(){location.href="https://zh.wiktionary.org/wiki/"+t();}
// useless
function 春雨医生_相关问答(){location.href="https://www.chunyuyisheng.com/pc/search/qalist/?query="+t();}
function 小白盘搜索(){location.href="https://www.xiaobaipan.com/list-"+t()+".html?from=1";}
function 电影网555(){location.href="https://www.555yy6.com/vodsearch/-------------.html?wd="+t();}
function 电影剧本(){location.href="https://www.kexiaoguo.com/sousuo/?query="+t();}
function 豌豆荚(){location.href="https://www.wandoujia.com/search?key="+t();}