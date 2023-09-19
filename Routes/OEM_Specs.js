const express = require("express");
const OEM_Model = require("../Models/OEM_Specs.model");
const oemRouter = express.Router();

oemRouter.get("/", async (req, res) => {
  const { search } = req.query;

  try {
    let query = {};

    if (search) {
      query = {
        $text: {
          $search: search,
        },
      };
    }

    let data = [];

    if (search) {
      data = await OEM_Model.find(query, { score: { $meta: "textScore" } }).sort({ score: { $meta: "textScore" } });
    } else {
      data = await OEM_Model.find();
    }

    res.send(data);
  } catch (error) {
    console.error("Error occurred while fetching OEM data:", error);
    res.status(500).send("An error occurred while fetching OEM data");
  }
});

oemRouter.get("/:id", async (req, res) => {
  const oemID = req.params.id;
  console.log("id:", oemID);

  try {
    const data = await OEM_Model.findById(oemID);

    if (data) {
      res.send(data);
    } else {
      res.status(404).send("OEM data not found");
    }
  } catch (error) {
    console.error("Error occurred while fetching OEM data:", error);
    res.status(500).send("An error occurred while fetching OEM data");
  }
});

oemRouter.post("/", async (req, res) => {
  const data = req.body;
  try {
    const notes = await OEM_Model.insertMany(data);
    res.send(notes);
  } catch (err) {
    console.log({ msg: "Error Occurred", error: err });
  }
});

module.exports = oemRouter;