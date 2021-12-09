import app from "./app";
import db from "./db";

app.start(db.getConection());
