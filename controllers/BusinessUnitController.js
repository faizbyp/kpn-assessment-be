const { readBusinessUnit } = require("../models/BusinessUnitModel");

const handleCreateBusinessUnit = async (req, res) => {};

const handleReadBusinessUnit = async (req, res) => {
  try {
    let result = await readBusinessUnit();
    res.status(200).send({
      message: `Success get business unit`,
      data: result,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const handleUpdateBusinessUnit = async (req, res) => {};
const handleDeleteBusinessUnit = async (req, res) => {};

module.exports = {
  handleCreateBusinessUnit,
  handleReadBusinessUnit,
  handleUpdateBusinessUnit,
  handleDeleteBusinessUnit,
};
