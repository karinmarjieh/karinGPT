const express = require("express");
const router = express.Router();
const {
  completionsController,
} = require("../controllers/completionsController");

// const app = express();
// app.use(express.json());
// app.use(cors());

router.post("/completions", completionsController);

module.exports = router;
