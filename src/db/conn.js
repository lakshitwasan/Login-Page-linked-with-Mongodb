const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://lakshitwasan31:lakshitMONGO7@cluster0.u5xqrk5.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true
}).then(() => {
    console.log("Connection Successful");
}).catch((e) => {
    console.log(e)
})