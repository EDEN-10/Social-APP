const { thought, user, Thought } = require("../models");
const thoughtRoutes = {
    getAllThougthes(req, res) {
        thought.find({})
        .populate({
            path: "thoughts",
        })
        .sort({_id: -1})
        .then((dbUserData)=> res.json(dbUserData))
        .catch((err)=> {
            res.status(400).json(err);
        });

    },
    getThoughtById({params}, res) {
        Thought.fineOne({
            _id: params.thoughtId 
        })
    .populate({ 
        path: 'thoughts'
    })
    .then((dbUserData) => {
        if(!dbUserData)  {
            res.status(404).json({ message: "Thought couldn't be found by that id!" });
            return;
          }
          res.json(dbUserData);
    })
    .catch((err) => {
        res.status(400).json(err);
      });
  },
addThought({ params, body }, res) {
    Thought.create(body)
      .then(({ _id }) => {
        console.log(_id);
        return User.findOneAndUpdate(
          { _id: body.userId },
          { $push: { thoughts: _id } },
          { new: true }
        );
      })
      .then((dbUserData) => {
        console.log(dbUserData);
        if (!dbUserData) {
          res.status(404).json({ message: "User couldn't found by this id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  updateThought({ params, body }, res) {
    console.log(params.thoughtId);
    console.log(body);
    Thought.findOneAndUpdate({ _id: params.thoughtId }, body, {
      new: true,
      runValidators: true,
    })
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "Thought couldn't be found by that id!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.status(400).json(err));
  },
  removeThought({ params }, res) {
    Thought.findOneAndDelete({ _id: params.thoughtId })
      .then((deletedThought) => {
        if (!deletedThought) {
          return res.status(404).json({ message: "Wrong Id for this thought!" });
        }
        console.log(deletedThought);
        User.findOneAndUpdate(
          { username: deletedThought.username },
          { $pull: { thoughts: params.thoughtId } },
          { new: true }
        ).then((dbUserData) => {
          if (!dbUserData) {
            res.status(404).json({ message: "Wrong Id user!" });
            return;
          }
          res.json(dbUserData);
        });
      })
      .catch((err) => res.json(err));
  },
  addReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $push: { reactions: body } },
      { new: true, runValidators: true }
    )
      .then((dbUserData) => {
        if (!dbUserData) {
          res.status(404).json({ message: "Wrong Id user!" });
          return;
        }
        res.json(dbUserData);
      })
      .catch((err) => res.json(err));
  },
  removeReaction({ params }, res) {
    Thought.findOneAndUpdate(
      { _id: params.thoughtId },
      { $pull: { reactions: { reactionId: params.reactionId } } },
      { new: true }
    )
      .then((dbUserData) => res.json(dbUserData))
      .catch((err) => res.json(err));
  },
};

module.export = thoughtRoutes; 
