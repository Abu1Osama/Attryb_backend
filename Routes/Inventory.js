const express = require("express");
const InventoryModel = require("../Models/inventry.model");

const inventoryRouter = express.Router();

inventoryRouter.get("/", async (req, res) => {
  const { search } = req.query;

  try {
    let query = InventoryModel.find();

    if (search) {
      query = query.find({
        $text: {
          $search: search,
        },
      });
    }

    const data = await query.populate("oemSpecs").exec();
    res.send(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).send({ msg: "An error occurred while fetching inventory data" });
  }
});

inventoryRouter.get("/dealer", async (req, res) => {
  const { dealer } = req.body;

  try {
    const inventory = await InventoryModel.find({ dealer }).populate("dealer oemSpecs");

    res.send(inventory);
  } catch (error) {
    console.error("Error occurred while fetching dealer inventory:", error);
    res.status(500).send({ msg: "An error occurred while fetching dealer inventory" });
  }
});

inventoryRouter.post("/", async (req, res) => {
  try {
    const newInventory = await InventoryModel.create(req.body);
    res.status(201).send(newInventory);
  } catch (error) {
    console.error("Error occurred while creating inventory:", error);
    res.status(500).send({ msg: "An error occurred while creating inventory" });
  }
});

inventoryRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    await InventoryModel.findByIdAndDelete(id);
    res.send("Inventory deleted");
  } catch (error) {
    console.error("Error occurred while deleting inventory:", error);
    res.status(500).send({ msg: "An error occurred while deleting inventory" });
  }
});

inventoryRouter.patch("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const updatedInventory = await InventoryModel.findByIdAndUpdate(id, req.body, { new: true });
    res.send(updatedInventory);
  } catch (error) {
    console.error("Error occurred while updating inventory:", error);
    res.status(500).send({ msg: "An error occurred while updating inventory" });
  }
});

module.exports = inventoryRouter;