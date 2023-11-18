// 输入框
const CachedInputBox = document.getElementById("CachedInputBox");
CachedInputBox.addEventListener("input", () => {
	localStorage.setItem("CachedInputBox", CachedInputBox.value);
});
document.addEventListener("DOMContentLoaded", () => {
	const CachedInputBox = localStorage.getItem("CachedInputBox");
	if (CachedInputBox) {
		document.getElementById("CachedInputBox").defaultValue = CachedInputBox;
	}
});