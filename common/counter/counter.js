// 次数
var today = new Date().toLocaleDateString();
var count = localStorage.getItem(today);
if (!count) {
	count = 1;
}
document.getElementById("counter").textContent = "这是你今天第 " + count + " 次打开本页面.";
count++;
localStorage.setItem(today, count);