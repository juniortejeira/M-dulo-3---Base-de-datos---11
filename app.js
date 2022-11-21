const express = require('express');
const mongoose = require('mongoose'); 
const bcrypt = require('bcrypt')
const url = mongoose.connect('mongodb://localhost/18-11-22');


const data_users = require('./module_Schema/module')
//solicitamos la ubicacion de las variables dentro de dev
require('dotenv').config({path:'./.env'})

//utilizamos la variable que necesitamos en env
const port = process.env.PORT || 5000;

const app = express();
//app.use(bodyParser.json())
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use(express.static(__dirname + '/public'))


app.post('/registro',(req,res)=>{
    //traemos los input del body del html
    const {username,password} = req.body;
    //traemos los datos del squema para usarlos
    const dataUsers = new data_users({username,password})

    dataUsers.save(err=>{
        if(err){
            res.status(500).send('ERROR AL REGISTRAR AL USUSARIO')
        }else{
            res.status(200).send('USUARIO REGISTRADO')
        }
    })

   /*  res.sendFile((__dirname+'/public/home.html' )) */
})

app.post('/',(req,res)=>{
    //traemos los input del body del html
    const {username,password} = req.body;
    data_users.findOne({username},(err,user)=>{
        console.log({username})
        if(err){
            res.status(500).send('ERROR AL AUTENTICAR AL USUARIO')
        }else if(!user){
            res.status(500).send('EL USUARIO NO EXISTE') 
        }else{
            user.inCorrectpasswordCreada(password,(err,result)=>{
                console.log(password)
                if(err){
                    res.status(500).send('ERROR AL AUTENTICAR')
                }else if(result){
                    res.status(200).send('USUARIO AUTENTIFICADO CORRECTAMENTE')
                }else{
                    res.status(500).send('EL USUARIO Y/O CONTRAÑA INCORRECTA')   
                }
            })
        }
    })
/*     res.sendFile((__dirname+'/public/home.html' )) */
})

app.get('/prueba',async(req,res)=>{
    const prueba = await data_users.find()
    console.log(prueba);
    res.json(prueba)
})

app.get('/',(req,res)=>{
    res.sendFile((__dirname+'/public/home.html' ))
})

app.get('/next',(req,res)=>{
    res.sendFile((__dirname+'/public/NextOfLogin.html' ))
})

app.get('/login',(req,res)=>{
    res.sendFile((__dirname+'/public/login.html' ))
})









/* app.post('/registro',async(req,res)=>{
    //datos requeridos en el cuerpo
    const usuario = req.body.usuario;
    const contraseña = req.body.contraseña;
    
    //debe ser async                      (dato a incriptar, cantidad de incriptacion)
    let contraseña_Hash = await bcrypt.hash(contraseña,8)
    let createUsers = await data_users.create({password:contraseña_Hash,user:usuario})
    console.log(createUsers + 'creado correctamente')
 
    res.sendFile((__dirname+'/public/Registro.html' ))
    
})
 */

app.listen(port, async () => {
    console.log("server start on port ", port);
  });