const {Router} = require('express');
const routes = Router();
//import Router from 'express';
//const routes = Router();

const Install = require('./install/Install');

/**
 * INSTALLATION ROUTES
 */
routes.get('/instal', Install.index);


export default routes() = (req, res) =>{
    return "teste";
}