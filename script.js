const nameInput = document.getElementById("senderName");
const shareButton = document.getElementById("shareButton");
const statusBox = document.getElementById("status");

// URL से पिछला नाम पढ़ना
const params = new URLSearchParams(window.location.search);
const previousName = params.get("name");

// अगर link किसी नाम से आया है
if (previousName) {

  const cleanPreviousName =
    previousName.trim();

  if (cleanPreviousName) {

    statusBox.textContent =
      cleanPreviousName +
      " ने आप के लिए गिफ्ट भेजा है 🎁";
  }
}


// SHARE BUTTON
shareButton.addEventListener(
  "click",
  async function () {

    const name =
      nameInput.value.trim();

    // नाम खाली है
    if (!name) {

      statusBox.textContent =
        "कृपया पहले अपना नाम लिखें।";

      nameInput.focus();

      return;
    }


    // नया forwarding URL
    const newUrl =
      window.location.origin +
      window.location.pathname +
      "?name=" +
      encodeURIComponent(name);


    // WhatsApp / Share message
    const shareText =
      name +
      " ने आप के लिए गिफ्ट भेजा है 🎁";


    /*
      Mobile में Android/iPhone
      का native Share menu खोलना
    */

    if (navigator.share) {

      try {

        await navigator.share({

          title:
            "नवरात्रि शुभकामनाएं",

          text:
            shareText,

          url:
            newUrl
        });

        statusBox.textContent =
          "शुभकामना आगे भेज दी गई ❤️";

      }

      catch (error) {

        // अगर user ने share menu बंद किया
        if (error.name !== "AbortError") {

          openWhatsApp(
            shareText,
            newUrl
          );
        }
      }

    }

    else {

      // पुराने browser में WhatsApp
      openWhatsApp(
        shareText,
        newUrl
      );
    }

  }
);


// WHATSAPP
function openWhatsApp(text, url) {

  const whatsappMessage =
    text +
    "\n\n" +
    url;

  const whatsappUrl =
    "https://wa.me/?text=" +
    encodeURIComponent(
      whatsappMessage
    );

  window.open(
    whatsappUrl,
    "_blank"
  );
}
