const translateNode = {
	translationDiv: document.createElement("div"),
	translatedText: document.createElement("p"),
	closeBtn: document.createElement("button"),
	createNodes: function () {
		document.body.append(
			Object.assign(document.createElement("style"), {
				textContent:
					"@keyframes slide-in-fwd-center{0%{transform:translate3d(-50%, 0, -1400px);opacity:0}100%{transform:translate3d(-50%, 0, 0);opacity:1}}",
			})
		);
		const translationDivStyle = {
			display: "none",
			position: "absolute",
			backgroundColor: "rgba( 255, 255, 255, 0.55 )",
			boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
			backdropFilter: "blur( 20.0px )",
			borderRadius: "10px",
			border: "1px solid rgba( 255, 255, 255, 0.18 )",
			padding: "15px",
			minHeight: "150px",
			width: "50%",
			left: "50%",
			top: "10px",
			animation: "slide-in-fwd-center 0.5s cubic-bezier(.25,.46,.45,.94) both",
		};
		const translatedTextStyle = {
			margin: "0",
			padding: "0",
			color: "#000",
			fontSize: "1rem",
		};
		const closeBtnStyle = {
			position: "absolute",
			top: "0",
			left: "100%",
			padding: "0",
			margin: "0",
			transform: "translateX(-100%)",
			width: "25px",
			height: "25px",
			background: "rgba( 255, 0, 0, 0.55 )",
			boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
			backdropFilter: "blur( 20.0px )",
			borderRadius: "5px",
			border: "1px solid rgba( 255, 255, 255, 0.18 )",
		};
		Object.assign(this.translationDiv.style, translationDivStyle);
		Object.assign(this.translatedText.style, translatedTextStyle);
		Object.assign(this.closeBtn.style, closeBtnStyle);
		this.closeBtn.textContent = "X";
		this.translationDiv.append(this.translatedText);
		this.translationDiv.append(this.closeBtn);
		document.body.appendChild(this.translationDiv);
		this.addEventListners();
	},
	toogleNodes: function () {
		if (this.translationDiv.style.display === "none") {
			this.translationDiv.style.display = "block";
			document.removeEventListener("selectionchange", onSelectChangeCallback);
		} else {
			this.translationDiv.style.display = "none";
			document.addEventListener("selectionchange", onSelectChangeCallback);
		}
	},
	updateTranslationText: function (text) {
		this.translatedText.innerText = text;
	},
	getTranslationText: function () {
		return this.translatedText.innerText;
	},
	addEventListners: function () {
		this.closeBtn.addEventListener("click", this.toogleNodes.bind(this));
		document.addEventListener("keydown", function (event) {
			if (event.code == "KeyZ" && event.ctrlKey) {
				translateNode.toogleNodes();
				console.log(translateNode.getTranslationText());
			}
		});
	},
};
translateNode.createNodes();
document.addEventListener("selectionchange", onSelectChangeCallback);

function onSelectChangeCallback() {
	let selectedString = "";
	let selection = document.getSelection();
	for (let i = 0; i < selection.rangeCount; i++) {
		selectedString += selection.getRangeAt(i).toString();
	}
	translateNode.updateTranslationText(selectedString);
}
