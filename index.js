import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

app.set('view engine', 'ejs');


let newItems = [];
let newWorks = [];


app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


function getCurrentTime() {
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    const day = weekday[new Date().getDay()];

    const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
    const month = months[new Date().getMonth()];

    const date = new Date(). getDate();
    
    let currentDay = day + ", " + month + " " + date;
    return currentDay;
}


app.get("/", (req, res) => {
    let currentDay = getCurrentTime();

    res.render("index.ejs", 
    { currentDay: currentDay, newItemList: newItems });
});

app.get("/work", (req, res) => {
    res.render("works.ejs", {newWorkList: newWorks}); 
});



app.post("/", (req, res, next) => {
    let newItem = req.body.text;
    newItems.push(newItem); 
    res.redirect("/"); 
});


app.post("/work", (req, res) => {
    let newWork = req.body.text;
    newWorks.push(newWork); 
    res.redirect("/work"); 
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});





