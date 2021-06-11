import api from "../../utils/api";
import results from "../../components/Results";

export default {
  data: {},
  build() {
    this.eventSelect();
  },

  eventSelect() {
    const selects = [...document.querySelectorAll(".filter__select")];

    selects.forEach((select) => {
      select.addEventListener("change", () => {
        const { value, name } = select;
        this.data[name] = value;
        if (select.children[0].textContent === "Select...") {
          select.children[0].remove();
        }

        const id =
          Object.keys(this.data).length < 3
            ? select.attributes["data-next"].value
            : "#results";

        document.querySelector(id).scrollIntoView();

        if (Object.keys(this.data).length === 3) {
          results.listPlants(api.send(this.data));
        }
      });
    });
  }
};
