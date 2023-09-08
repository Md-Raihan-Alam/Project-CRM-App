require("dotenv").config();
const cors = require("cors");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
app.use(
  cors({
    origin: "https://project-crm-app-cf14-hvatqstcb-md-raihan-alam.vercel.app/",
    credentials: true,
  })
);
app.use(cookieParser());
//connnecting db
const connectDB = require("./db/connect");
//router
const crmRouter = require("./routes/crmRouter.js");
const authRouter = require("./routes/authRouter");
//middlewares
const auth = require("./middleware/authentications");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("CRM has started");
});
//api setup
app.use("/api/v1/CRM", auth, crmRouter);
app.use("/api/v1/auth", authRouter);
const port = process.env.PORT || 9000;
const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`Server is listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};
start();
