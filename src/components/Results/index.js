export default {
  list: document.querySelector(".results__list"),
  empty: document.querySelector(".results__empty"),

  showElement(showEl, hideEl) {
    hideEl.classList.add("hide");
    showEl.classList.remove("hide");
  },

  showInfo({ msg, type = "info", delay = 5000 }) {
    const el = document.createElement("div");
    el.classList.add("message", type);
    el.innerHTML = `${msg}`;
    el.style.setProperty("--delay", `${delay / 1000}s`);

    document.querySelector("body").appendChild(el);
    setTimeout(() => document.querySelector(".message").remove(), delay);
  },

  generateList(plants) {
    const generateTags = (sun, water, toxicity) => {
      let maintaince = "1-drop";
      if (water === "daily") maintaince = "2-drops";
      if (water === "regularly") maintaince = "3-drops";

      let sunExposure = "no-sun";
      if (sun === "low") sunExposure = "low-sun";
      if (sun === "high") sunExposure = "high-sun";

      const pets = toxicity === false ? "pet" : "toxic";

      return `
        <img src="./images/icons/${maintaince}.svg" />
        <img src="./images/icons/${sunExposure}.svg" />
        <img src="./images/icons/${pets}.svg" />
      `;
    };

    const card = ({
      url,
      name,
      price,
      sun,
      water,
      toxicity,
      staff_favorite
    }) => `
    <div class="results__card" name="${name}">
      <a href="https://www.google.com/search?q=${name}" target="_blank">
      <img
        class="results__card__image"
        src="${url}"
        alt="${name}"
      />
      ${
        staff_favorite === true
          ? `<span class="results__favorite">✨ Staff favorite</span>`
          : ""
      }
      <span class="results__card__name">
        ${name}
      </span>
      <div class="results__card__details">
        <span class="results__card__price">
          ${Number(price).toLocaleString("en", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0
          })}
        </span>
        <div class="results__card__tags">
          ${generateTags(sun, water, toxicity)}
        </div>
      </div>
      </a>
    </div>
    `;

    return plants.reduce((t, plant) => `${t}${card(plant)}`, "");
  },

  generateSkeleton() {
    const card = `<div class="results__card results__card--loading">
      <div class="results__card__image"></div>
      <div class="results__card__name"></div>
      <div class="results__card__details"></div>
    </div>`;

    return card + card + card;
  },

  async listPlants(data) {
    try {
      this.showElement(this.list, this.empty);
      const container = document.querySelector(".results__list__list");
      const skeletonList = this.generateSkeleton();
      container.innerHTML = skeletonList;

      const plants = await data;

      if (plants.length === 0 || plants.status === 404) {
        this.showElement(this.empty, this.list);
        this.showInfo({
          msg: "Sorry, we weren't able to find anything. Try a new combination."
        });
        return;
      }

      const list = this.generateList(plants);
      container.innerHTML = list;
      this.showElement(this.list, this.empty);
    } catch (err) {
      this.showInfo({
        type: "error",
        msg: "Sorry, we weren't able to retrive the results. Try again later."
      });
    }
  }
};
