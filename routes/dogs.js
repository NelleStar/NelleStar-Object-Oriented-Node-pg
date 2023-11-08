const express = require("express");
const router = new express.Router();

const Dog = require("../models/dog")

// GET routes - list of dogs and single dog
router.get("/", async function (req, res, next) {
    try {
        let dogs = await Dog.getAll();
        dogs.forEach(d => d.speak())
        return res.json(dogs);
    } catch(err) {
        return next(err);
    };
});

router.get("/:id", async (req, res, next) => {
    try {
        let dog = await Dog.getById(req.params.id);
        return res.json(dog);
    } catch(err) {
        return next(err)
    }
    
});

// POST route - make a new dog
router.post("/", async function (req, res, next) {
  try {
    const { name, age } = req.body;
    let dog = await Dog.create(name, age);    
    return res.json(dog);
  } catch (err) {
    return next(err);
  }
});

// DELETE a dog by id - first we need to find the specific dog object and set it to dog then we take that object and call our instance method of remove on it
router.delete("/:id", async (req, res, next) => {
  try {
    let dog = await Dog.getById(req.params.id);
    await dog.remove();
    return res.json({ msg: "DELETED" });
  } catch (err) {
    return next(err);
  }
});

// UPDATING a dog by hard coding an age
router.patch("/:id/age", async (req, res, next) => {
    try {
        let dog = await Dog.getById(req.params.id);
        dog.age += 1;
        await dog.save();
        return res.json(dog)
    } catch (err) {
        return next(err);
    };
})

// UPDATING a dog by using the req.body information from user
router.patch("/:id/name", async (req, res, next) => {
  try {
    let dog = await Dog.getById(req.params.id);
    dog.name = req.body.name;
    await dog.save();
    return res.json(dog);
  } catch (err) {
    return next(err);
  }
});

module.exports = router;