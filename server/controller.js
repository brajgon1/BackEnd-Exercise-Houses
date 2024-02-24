const houses = require("./db.json");
let globalId = 4;

module.exports = {
  getHouses: (req, res) => {
    res.status(200).json(houses);
  },

  createHouse: (req, res) => {
    const newHouse = { ...req.body, id: globalId };
    houses.push(newHouse);
    globalId += 1;
    res.status(200).json(houses);
  },

  deleteHouse: (req, res) => {
    const { id } = req.params;
    for (let i = 0; i < houses.length; i++) {
      if (houses[i].id === parseInt(id)) {
        houses.splice(i, 1);
        res.status(200).json(houses);
      }
    }
  },

  updateHouse: (req, res) => {
    const { id } = req.params;
    const { type } = req.body;
    for (let i = 0; i < houses.length; i++) {
      if (houses[i].id === parseInt(id)) {
        if (type === "minus") {
          const less = houses[i].price - 10000;
          houses[i].price = less;
          res.status(200).json(houses);
          return;
        }

        if (type === "plus") {
          const more = houses[i].price + 10000;
          houses[i].price = more;
          res.status(200).json(houses);
          return;
        }
      }
    }
  },
};
