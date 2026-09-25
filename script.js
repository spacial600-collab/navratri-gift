const nameInput = document.getElementById("senderName");
const shareButton = document.getElementById("shareButton");
const statusBox = document.getElementById("status");

const params = new URLSearchParams(window.location.search);
const previousName = params.get("name");

if (previousName) {
  statusBox.textContent =
    previousName.trim() + " ने आप के लिए गिफ्ट भेजा है 🎁";
}

shareButton.addEventListener("click", async () => {

  const name = nameInput.value.trim();

  if (!name) {
    statusBox.textContent = "कृपया अपना नाम लिखें।";
    nameInput.focus();
    return;
  }

  const shareUrl =
    window.location.origin +
    window.location.pathname +
    "?name=" +
    encodeURIComponent(name);

  const shareText =
    name + " ने आप के लिए गिफ्ट भेजा है 🎁";

  if (navigator.share) {
    try {
      await navigator.share({
        text: shareText + "\n" + shareUrl
      });

      statusBox.textContent = "गिफ्ट आगे भेज दिया गया ❤️";

    } catch (error) {

      if (error.name !== "AbortError") {
        statusBox.textContent =
          "Share menu खोलने में समस्या हुई।";
      }
    }

  } else {

    statusBox.textContent =
      "इस browser में Android Share menu उपलब्ध नहीं है।";
  }
});
