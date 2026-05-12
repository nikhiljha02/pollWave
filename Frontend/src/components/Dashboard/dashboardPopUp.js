export default function showPopup(message, type) {
  const popup = document.createElement("div");
  popup.classList.add("popUpSpan");

  popup.style.position = "fixed";
  popup.style.top = "20px";
  popup.style.left = "50%";
  popup.style.transform = "translateX(-50%)";
  popup.style.background = "rgba(255, 255, 255, 0.04)";
  popup.style.backdropFilter = "blur(14px)";
  popup.style.boxShadow = "0 10px 35px rgba(91, 79, 232, 0.22)";
  popup.style.color = "white";
  popup.style.padding = "12px 20px";
  popup.style.borderRadius = "12px";
  popup.style.zIndex = "9999";
  popup.style.fontWeight = "600";
  popup.style.display = "flex";
  popup.style.alignItems = "center";
  popup.style.gap = "12px";

  if (type === "error") {
    popup.style.background = "red";
  }

  // Message text
  const text = document.createElement("span");
  text.innerText = message;

  // Close button
  const closeBtn = document.createElement("span");
  const copied = document.createElement("span");
  copied.style.display = "none";
  copied.style.marginLeft = "10px";
  copied.innerHTML = `Copied!`;

  closeBtn.innerHTML = `
    <svg xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      style="cursor:pointer;">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
  `;

  closeBtn.onclick = () => {
    popup.remove();
    copied.remove();
  };

  popup.appendChild(text);
  popup.appendChild(closeBtn);
  popup.appendChild(copied);

  document.body.appendChild(popup);

  // Auto remove after 3 sec
  // setTimeout(() => {
  // popup.remove();
  // }, 3000);

  document
    .querySelector(".popUpSpan")
    .addEventListener("click", async function (e) {
      try {
        await navigator.clipboard.writeText(e.target.textContent);
        copied.style.display = "block";
      } catch (error) {}
    });
}
