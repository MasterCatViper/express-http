const express = require("express")
const app = express()
const user = {
    name: "John",
    kidneys : [{
        healthy : false,
    },
{
    healthy: true
}]
}
const users = [user];
app.use(express.json())
app.get("/",function(req,res)  {
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    //filter
    let numberOfHealthyKidneys = 0;
    for(let i=0;i<johnKidneys.length;i++) {
        if(johnKidneys[i].healthy) {
            numberOfHealthyKidneys = numberOfHealthyKidneys + 1;
        }
    }
    const numberOfUnhealthyKidneys = numberOfKidneys - numberOfHealthyKidneys;
    res.json({
        numberOfKidneys,
        numberOfHealthyKidneys,
        numberOfUnhealthyKidneys
    })
})

app.post("/",function(req,res) {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        message : "Done!"
    })
})

app.put("/",function(req,res) {
    for(let i=0;i<users[0].kidneys.length;i++){
        users[0].kidneys[i].healthy = true
    }
    res.json({
        message: "Done and replaced !"
    })
}) 
app.delete("/",function(req,res) {
    //you should return a if check if there is no u healthy kidneys 
    //only if atleast one unhealthy kidneys is there then do this 
    if(isThereAtleast()) {
    const newKidneys = [];
    for(let i=0;i<users[0].kidneys.length;i++) {
        if(users[0].kidneys[i].healthy) {
            newKidneys.push({
                healthy : true
            })
        }
    }
    users[0].kidneys = newKidneys;
    res.json({
        msg: "Deleted kidneys successfully !"
    })
}
else {
    res.status(411).json({
        msg : "You have no bad kidneys !"
    })
}
})
function isThereAtleast() {
    let atleastOneUnhealthyKidney = false;
    for(let i=0;i<users[0];i++) {
        if(!users[0].kidneys[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney;
}
app.listen(3000)














// const express = require('express')

// const app = express() 

// // function sum(n) {
// //     let ans = 0;
// //     for(let i=0;i<=n;i++) {
// //         ans = ans + i;
// //     }
// //     return ans;
// // }

// // app.get("/",function (req,res) {
// //     const n = req.query.n;
// //     const ans = sum(n);
// //     res.send(`Hi Your answer is ${ans}`)
// // })




// app.listen(3000,function(){
//     console.log("Server is running on port 3000")
// })