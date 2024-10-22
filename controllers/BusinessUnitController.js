const { readBusinessUnit, createBusinessUnit } = require("../models/BusinessUnitModel");
const { v4: uuidv4 } = require("uuid");

const handleCreateBusinessUnit = async (req, res) => {
  const payload = {
    id_business_unit: uuidv4(),
    code_business_unit: req.body.code_business_unit,
    name_business_unit: req.body.name_business_unit,
    is_active: req.body.is_active,
  };

  try {
    let result = await createBusinessUnit(payload);
    res.status(200).send({
      message: `Success add business unit`,
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

const handleUpdateBusinessUnit = async (req, res) => {};
const handleDeleteBusinessUnit = async (req, res) => {};

module.exports = {
  handleCreateBusinessUnit,
  handleReadBusinessUnit,
  handleUpdateBusinessUnit,
  handleDeleteBusinessUnit,
};
