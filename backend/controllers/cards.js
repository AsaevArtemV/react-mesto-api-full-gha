const Card = require('../models/card');
const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  ValidationError,
} = require('../errors/errors');

const getAllCards = (req, res, next) => {
  Card.find({}).sort({ createdAt: -1 })
    .then((cards) => res.status(200).send(cards))
    .catch((err) => {
      next(err);
    });
};

const createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;

  Card.create({ name, link, owner })
    .then((newCard) => {
      res.status(201).send(newCard);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Проверьте правильность заполнения полей:
        ${Object.values(err.errors).map((error) => `${error.message.slice(5)}`).join(' ')}`));
      } else {
        next(err);
      }
    });
};

const deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с указанным id: ${cardId} отсутствует`);
      } else if (card.owner.toString() !== req.user._id) {
        throw new ForbiddenError('Удаление чужой карточки невозможно');
      } else {
        Card.findByIdAndRemove(cardId)
          .then((removedCard) => res.status(200).send(removedCard))
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Передан некорректный id: ${cardId}`));
      } else {
        next(err);
      }
    });
};

const likeCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточка с указанным id: ${cardId} нет`);
      } else {
        Card.findByIdAndUpdate(
          req.params.cardId,
          { $addToSet: { likes: req.user._id } },
          { new: true },
        )
          .then((removedCard) => res.status(200).send(removedCard))
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Передан некорректный id: ${cardId}`));
      } else {
        next(err);
      }
    });
};

const deleteLike = (req, res, next) => {
  const { cardId } = req.params;

  Card.findById(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError(`Карточки с указанным id: ${cardId} нет`);
      } else {
        Card.findByIdAndUpdate(
          req.params.cardId,
          { $pull: { likes: req.user._id } },
          { new: true },
        )
          .then((removedCard) => res.status(200).send(removedCard))
          .catch((err) => {
            next(err);
          });
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`Передан некорректный id: ${cardId}`));
      } else {
        next(err);
      }
    });
};

module.exports = {
  getAllCards,
  createCard,
  deleteCard,
  likeCard,
  deleteLike,
};
