  const viewMoreBtn = document.getElementById("viewMore-btn");
  const hiddenTestimonials = document.querySelectorAll(".hidden");

  let hid = false;

  viewMoreBtn.addEventListener("click", () => {
    hiddenTestimonials.forEach(t => t.classList.toggle("hidden"));
    hid = !hid;
    if (hid) {
  viewMoreBtn.textContent = "View Less";
} else {
  viewMoreBtn.textContent = "View More";
}
  });