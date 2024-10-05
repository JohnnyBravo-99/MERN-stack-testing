import { url } from "../config/db.config.js";

import mongoose, { Promise } from "mongoose";
Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = url;
db.tutorials = require("./tutorial.model.js").default(mongoose);
db.events = require("./calendar.model.js")(mongoose);
db.user = require("./user.model.js").default;  // Corrected import

export default db;