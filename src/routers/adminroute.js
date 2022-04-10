const express = require("express");
const Tweet = require("../models/Tweet");
const User = require("../models/User");
const Report = require("../models/Report");
const Admin = require("../models/Admin")
const auth = require("../middleware/auth");
const { query } = require("express");
const router = new express.Router();

router.post("/create",auth("admin"),async (req, res) => {
    const admin = new Admin(req.body);
    try {
      await admin.save();
      const token = await admin.generateAuthToken();
  
      res.status(201).send({ admin,token}).end();
    } catch (e) {
      res.status(400).send({error:e.toString()});
    }
  });
          //~~~~~~Report~~~~~~~~

// TODO: IN NEXT PHASES
router.delete("/report/:id",auth("admin"),async (req, res) => {
  try {
    const deletedreport=await Report.findByIdAndDelete(req.params.id)
    if(!deletedreport){throw Error("Not Found")}
    res.status(200).json({deletedreport}).end()

  } catch (e) {
    res.status(400).send({error:e.toString()});
  }
});
router.get("/report/:pageNum",auth("admin"),async (req, res) => {
  try {
    const filter = req.query.filter ? {type:req.query.filter} : {};
    const perPage = req.query.perPage ? parseInt(req.query.perPage) : 1;
    const skip=(parseInt(req.params.pageNum)-1)*perPage;
    let reports=await Report.find(filter)
    .skip(skip).limit(perPage)
    .sort({createdAt:-1});
    reports= await Promise.all(reports.map(async(report)=>{
      if(report.type==="User")
      {
        return await Report.populate(report,{path:'reportedId',model:User})
      }
      else if(report.type==="Tweet")
      {
        return await Report.populate(report,{path:'reportedId',model:Tweet})
      }
    }))
    if(reports.length===0){throw Error("No Reports Found")}
    res.status(200).json({reports}).end()

  } catch (e) {
    res.status(400).send({error:e.toString()});
  }
});
// router.post("/ban/:id",auth("admin"),async (req, res) => {
//   try {
//     const tempUser=await User.findByIdAndUpdate(req.params.id,{ban:req.body.banUntil})
//     res.status(200).send({tempUser})
//   } catch (e) {
//     res.status(400).send({error:e.toString()});
//   }
// });
// router.get("/dashboard",auth("admin"),async (req, res) => {
//   try {
//     res.status(200).end("<h1>Placeholder<h1>")

//   } catch (e) {
//     console.log(e)
//     res.status(400).send({error:e.toString()});
//   }
// });

//~~~~~~Search for user or tweet~~~~~~~~
//Search will take the text from the search bar in req.body and search for the keyword in all tweets
//and return all matching tweets and will also lookup users that has this keyword and return them
// if not found will return a 200 status but say it is not found if an error occured will return
// a 400 timeout or 500 server error
// router.post("/search", async (req, res) => {
//   try {
//     console.log("Search function implementation");
//   } catch (e) {
//     console.log({error:e.toString()});
//   }
// });

module.exports = router;

