/* Created by Tivotal */

let wrapper = document.querySelector(".wrapper");
let qrForm = document.querySelector("form");
let qrInput = document.querySelector("input");
let qrImg = document.querySelector("img");
let qrText = document.querySelector("p");
let qrArea = document.querySelector("textarea");
let closeBtn = document.querySelector(".close");
let copyBtn = document.querySelector(".copy");

function fetchData(file, formData) {
  qrText.innerText = "Scanning QR code...";
  fetch("http://api.qrserver.com/v1/read-qr-code/", {
    method: "POST",
    body: formData,
  })
    .then((response) => response.json())
    .then((result) => {
      result = result[0].symbol[0].data;
      qrText.innerText = result
        ? "Upload QR code to read"
        : "Couldn't read QR code";
      if (!result) return;
      qrArea.innerText = result;
      qrImg.src = URL.createObjectURL(file);
      wrapper.classList.add("active");
    })
    .catch(() => {
      qrText.innerText = "Couldn't read QR code";
    });
}

qrInput.addEventListener("change", async (e) => {
  let file = e.target.files[0];
  //if file is empty
  if (!file) return;

  //if file is not empty
  let formData = new FormData();
  formData.append("file", file);
  fetchData(file, formData);
});

qrForm.addEventListener("click", () => qrInput.click());
closeBtn.addEventListener("click", () => {
  wrapper.classList.remove("active");
});

copyBtn.addEventListener("click", () => {
  let textToCopy = qrArea.textContent;
  navigator.clipboard.writeText(textToCopy);
});
