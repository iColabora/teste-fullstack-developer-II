import { Request, Response } from 'express';
import {Campo} from '../models/Campo';


export const mostraCampos = async (req: Request, res: Response)=>{

    let campos = await Campo.findAll();
    /*
    res.render('pages/professor', {
        alunos
    });
   */ 
    res.json(campos);
   
};


export const newCampo = async (req: Request, res: Response)=>{
    
    let {valor} = req.body;
  
    let campoNew = await Campo.create({valor});
    res.json({id:campoNew.id, valor});

     /*
    if(name){
        await Aluno.create({
            name,
            nota1,
            nota2,
            nota3,
            nota4
        });
    }
    */
    //res.redirect('/');
    //res.render('/pages/professor');
}

export const consultaCampos = async (req:Request,res:Response) =>{
    let id = await req.body.id;
    let consulta = await Campo.findByPk(id);

    res.json(consulta);
    
}