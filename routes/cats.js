const express = require("express");
const db = require("../db");
const Cat = require("../models/cat")

const router = new express.Router();

// get all cats: [{id, name, age}, ...]
router.get("/", async function (req, res, next) {
    try {
        const cats = await Cat.getAll();
        return res.json(cats);
    } catch(err) {
        return next(err);
    };
});

router.get("/:id", async (req, res, next) => {
    try {
        const cat = await Cat.getById(req.params.id);
        return res.json(cat);
    } catch(err) {
        return next(err);
    };
});

router.post('/', async (req, res, next) => {
    try {
        const { name, age } = req.body;
        const newCat = await Cat.create(name, age);
        return res.json(newCat)
    } catch(err) {
        return next(err);
    };
});

// updating everything on a cat so put --- if we were just updating 1 or 2 things then patch
router.put("/:id", async (req, res, next) => {
  try {
    const { name, age } = req.body;
    const cat = await Cat.update(req.params.id, name, age );
    return res.json(cat);
  } catch (err) {
    return next(err);
  }
});

// Just an example of a patch - going to hard code the function to add 1 to age of the cat 
router.patch('/:id', async(req, res, next) => {
    try {
        const cat = await Cat.makeOlder(req.params.id);
        return res.json(cat);
    } catch(err){
        return next(err);
    };
})

router.delete('/:id', async(req, res, next) => {
    try {
        await Cat.delete(req.params.id);
        return res.json({ msg: "DELETED!"})
    } catch(err) {
        return next(err)
    };
});

module.exports = router;