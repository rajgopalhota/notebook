const express = require("express");
const router = express.Router();
const authenticate = require("../middlewares/authenticate");
const { body } = require("express-validator");
const {
  fetchNotes,
  addNotes,
  updateNotes,
  deleteNote,
} = require("../controllers/notes");

// ROUTE 1: Get All the Notes using: GET "/api/notes/getuser". Login required
router.get("/fetchallnotes", authenticate, fetchNotes);

// ROUTE 2: Add a new Note using: POST "/api/notes/addnote". Login required
router.post(
  "/addnote",
  authenticate,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 characters").isLength({
      min: 5,
    }),
  ],
  addNotes
);

// ROUTE 3: Update an existing Note using: PUT "/api/notes/updatenote". Login required
router.put("/updatenote/:id", authenticate, updateNotes);

// ROUTE 4: Delete an existing Note using: DELETE "/api/notes/deletenote". Login required
router.delete("/deletenote/:id", authenticate, deleteNote);
module.exports = router;
