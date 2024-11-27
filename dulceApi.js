const http = require("node:http");
const fs = require("node:fs");
const { json } = require("stream/consumers");

const puerto = 3001;

const archivoItems = fs.readFileSync("./json/productos.json", "utf8");
var objetoItems = JSON.parse(archivoItems);
//console.log(objetoItems);

const server = http.createServer((request, response) => {

    response.setHeader("Access-Control-Allow-Origin", "*");
            
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
            
    response.setHeader("Access-Control-Allow-Header", "Content-Type");
        
    switch(request.method)
    {
        case "GET":
            
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json; charset=utf-8");
            response.end(JSON.stringify(objetoItems.ListaProductos));
        break;
        case "POST":
            //aqui vamos a insertar info
            
             // el on fucniona para verificar si se esta mandando informacion
            request.on("data", info => {
                
                var objNewItem = JSON.parse(info.toString());
                objetoItems.ListaProductos.push(objNewItem);

                fs.writeFileSync("./json/productos.json", JSON.stringify(objetoItems)); //el fs.writeFileSync permite guardar de manera constamnte los datos ingresados, osea aun reiniciiando server y pagina deben de seguir ahi los datos

                var OkResponse = {
                    "mensaje" : "Todo se encuentra bien"
                }

                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json; charset=utf-8");
                response.end(JSON.stringify(objetoItems.ListaProductos));

            });

        break;
        case "PUT":
            //aqui estamos mandando informacion
            var informacion = "";
            request.on("data", info => {
                informacion += info.toString(); //aqui manda y guarda la info por cachos, ya que es mucha y pesada. La divide y alamcena enuna variable
            });
            request.on("end", info => {

                //aqui vamos a transformar la info recibida a objeto
                var objModItem = JSON.parse(informacion);

                //aqui vamos a modificar el JSON archivoItems con la nueva info de ObjModItems
                
                objetoItems.ListaProductos[0] = objModItem;
                //aqui se debe guardar la info que cambio en la web modificando el json que tenemos
                fs.writeFileSync("./json/items.json", JSON.stringify(objetoItems), "utf8");
            });

        break;
        case "DELETE":

            request.on("data", info => {
                console.log(info.toString());
                var objdel = JSON.parse(info.toString());

                objetoItems.ListaProductos.splice(objdel.id, 1); //aqui es la linea que borra, el .splice borra un punto especifico .splice(variable.id del elemento, cuantos elementos van a borrar)

                fs.writeFileSync("./js/items.json", JSON.stringify(objetoItems), "utf8");

                var OkResponse = {
                    "mensaje" : "mensaje borrado"
                }
            response.statusCode = 200;
            response.setHeader("Content-Type", "application/json; charset=utf-8");
            response.end(JSON.stringify(objetoItems.ListaProductos));

            })

        break;
        //OPTIONS se usa porque no dejaba usar delete o put
        case "OPTIONS":
            //aqui se va a mandar una respuesta HHTP204, (que se espere basicamente) 
            response.writeHead(204);
            response.end();
        break;

    }

   
            
    
});

server.listen(puerto, () => {
    console.log("Servidor encendido y a la escucha en: http://localhost:" + puerto);
});
