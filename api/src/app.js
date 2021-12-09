import express from "express";
import {App} from "./object";
import morgan from "morgan";


const app = new App(express());

// middlewares
app.createMiddleware(morgan('dev'));

app.createMiddleware(express.json());

app.createMiddleware(express.urlencoded({extended: true}));

export default app;
