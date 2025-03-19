document.addEventListener("DOMContentLoaded", function () {
  let eoCards = document.querySelectorAll(".eo_card");

  eoCards.forEach((card) => {
    card.addEventListener("mouseover", function () {
      this.style.boxShadow = "0px 6px 12px rgba(0, 0, 0, 0.2)";
    });

    card.addEventListener("mouseout", function () {
      this.style.boxShadow = "0px 4px 6px rgba(0, 0, 0, 0.1)";
    });
  });
});
