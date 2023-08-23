const ClothingItem = require("../models/clothingItem");
const {
  ValidationError,
  ServerError,
  NotFoundError,
} = require("../utils/errors");

module.exports.createClothingItem = (req, res) => {
  console.log(req.user._id); // _id will become accessible
  console.log(res);
};

module.exports.getItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.status(200).send({ data: items }))
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send(validationError.message);
      }
      const serverError = new ServerError();
      return res.status(serverError.statusCode).send(serverError.message);
    });
};

module.exports.createItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  console.log(req.user);
  ClothingItem.create({ name, weather, imageUrl, owner: req.user })
    .then((item) => res.status(200).send({ data: item }))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occured while executing the code`,
      );
      if (err.name === "ValidationError") {
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send({ message: validationError.message });
      }
      const serverError = new ServerError();
      return res
        .status(serverError.statusCode)
        .send({ message: serverError.message });
    });
};

module.exports.deleteItem = (req, res) => {
  ClothingItem.findByIdAndRemove(req.params.itemId)
    .orFail(() => {
      const deleteItemError = new Error(
        "The item could not be found in order to be deleted",
      );
      deleteItemError.name = "DeleteItemError";
      deleteItemError.statusCode = 404;
      throw deleteItemError;
    })
    .then((item) => res.status(200).send(item))
    .catch((err) => {
      console.error(
        `Error ${err.name} with the message ${err.message} has occured while executing the code`,
      );
      if (err.name === "NotFoundError" || err.name === "DeleteItemError") {
        const notFoundError = new NotFoundError();
        return res
          .status(notFoundError.statusCode)
          .send({ message: notFoundError.message });
      }
      if (err.name === "ValidationError" || err.name === "CastError") {
        const validationError = new ValidationError();
        return res
          .status(validationError.statusCode)
          .send({ message: validationError.message });
      }
      const serverError = new ServerError();
      return res
        .status(serverError.statusCode)
        .send({ message: serverError.message });
    });
};
