import express from "express";
import { Router } from "express";
import {App} from "./object";
import morgan from "morgan";
import { routes } from "./routes";


const app = new App(express(), Router);

// middlewares
app.createMiddleware(morgan('dev'));

app.createMiddleware(express.json());

app.createMiddleware(express.urlencoded({extended: true}));

// routes 
routes(app)

export default app;
