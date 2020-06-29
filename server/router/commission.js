const router = require("express").Router();
const CommissionController = require("../controllers/commissionController");
const authentication = require("../middleware/authentication");
const {commissionAuthorization} = require("../middleware/authorization");

router.get("/all", CommissionController.getAllCommissions);
router.get("/:id", CommissionController.select);

router.use(authentication);

router.get("/", CommissionController.mylist);
router.post("/", CommissionController.add);
router.put("/:id", commissionAuthorization, CommissionController.edit);
router.delete("/:id",commissionAuthorization, CommissionController.delete);

module.exports = router;
