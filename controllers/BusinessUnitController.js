const {
  readBusinessUnit,
  createBusinessUnit,
  updateBusinessUnit,
  deleteBusinessUnit,
} = require("../models/BusinessUnitModel");
const { v4: uuidv4 } = require("uuid");

const handleCreateBusinessUnit = async (req, res) => {
  const payload = {
    id: uuidv4(),
    code: req.body.code,
    name: req.body.name,
    is_active: req.body.is_active,
  };

  try {
    let result = await createBusinessUnit(payload);
    res.status(200).send({
      message: `Success create business unit`,
      code: result,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

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

const handleUpdateBusinessUnit = async (req, res) => {
  const id = req.params.id;
  const payload = req.body;
  try {
    let result = await updateBusinessUnit(payload, id);
    res.status(200).send({
      message: `Success update business unit`,
      code: result,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

const handleDeleteBusinessUnit = async (req, res) => {
  const id = req.params.id;
  try {
    let result = await deleteBusinessUnit(id);
    res.status(200).send({
      message: `Success delete business unit`,
      id: id,
    });
  } catch (error) {
    res.status(500).send({
      message: error.message,
    });
  }
};

module.exports = {
  handleCreateBusinessUnit,
  handleReadBusinessUnit,
  handleUpdateBusinessUnit,
  handleDeleteBusinessUnit,
};
