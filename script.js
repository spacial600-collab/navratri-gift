
// URL से पहले से मौजूद नाम पढ़ना
const params = new URLSearchParams(window.location.search);
const previousName = params.get("name");

const nameInput = document.getElementById("senderName");
const shareButton = document.getElementById("shareButton");
const message = document.getElementById("message");

// अगर किसी ने पहले नाम से link खोला है
if (previousName) {
  const cleanName = previousName.trim();

  if (cleanName) {
    message.textContent =
      cleanName + " ने आप के लिए गिफ्ट भेजा है 🎁";
  }
}

// Share button
shareButton.addEventListener("click", async function () {

  const name = nameInput.value.trim();

  if (!name) {
    message.textContent = "कृपया पहले अपना नाम लिखें।";
    nameInput.focus();
    return;
  }

  // Current page का नया link
  const newUrl =
    window.location.origin +
    window.location.pathname +
    "?name=" +
    encodeURIComponent(name);

  // Share message
  const shareText =
    name + " ने आप के लिए गिफ्ट भेजा है 🎁";

  // WhatsApp के लिए message
  const whatsappUrl =
    "https://wa.me/?text=" +
    encodeURIComponent(shareText + "\n\n" + newUrl);

  // Mobile पर native share menu
  if (navigator.share) {

    try {

      await navigator.share({
        title: "नवरात्रि शुभकामनाएं",
        text: shareText,
        url: newUrl
      });

      message.textContent = "शुभकामना आगे भेज दी गई ❤️";

    } catch (error) {

      // User ने share menu बंद कर दिया
      if (error.name !== "AbortError") {
        window.open(whatsappUrl, "_blank");
      }

    }

  } else {

    // पुराने browser में सीधे WhatsApp
    window.open(whatsappUrl, "_blank");

  }

});
