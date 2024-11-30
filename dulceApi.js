const http = require("node:http");
const fs = require("node:fs");

const puerto = 3001;

const archivoItems = fs.readFileSync("./json/items.json", "utf8");
const objetoItems = JSON.parse(archivoItems);

const server = http.createServer((request, response) => {
    response.setHeader("Access-Control-Allow-Origin", "*");
    response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    response.setHeader("Access-Control-Allow-Header", "Content-Type");

    console.log(request.method);
    switch(request.method){
        case "GET":
            if(request.url == "/"){
                //console.log(objetoItems);
                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json; charset=utf-8");
                response.end(JSON.stringify(objetoItems.arreglo_items));
            }
            else{
                
            }
        break;
        case "POST":
            if(request.url == "/"){
                var informacion = "";
                request.on("data", info =>{
                    informacion += info.toString();
                });
                request.on("end", info => {
                    console.log("termine de leer");
                    var objetoAgregarPersona = JSON.parse(informacion);
                    objetoAgregarPersona.id = objetoItems.arreglo_items.length;
                    objetoItems.arreglo_items.push(objetoAgregarPersona);

                    fs.writeFileSync("./json/items.json", JSON.stringify(objetoItems), "utf8");

                    response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json; charset=utf-8");
                    response.end(JSON.stringify({"respuesta": "persona agregada correctamente"}));


                    /*
                    const matches = informacion.objetoAgregarPersona.imagen.match(/^data:(.+);base64,(.+)$/);
                    const buffer = Buffer.from(matches[2], 'base64');
                    fs.writeFileSync("./img/imagenPrueba.png", buffer);
                    */
                })

            }
            else{
                var informacion = ""
                request.on("data", info =>{
                    informacion += info;
                });
                request.on("end", info =>{
                    const matches = informacion.match(/^data:(.+);base64,(.+)$/);
                    const buffer = Buffer.from(matches[2], 'base64');
                    fs.writeFileSync("./img/imagenPrueba.png", buffer);

                    /*response.statusCode = 200;
                    response.setHeader("Content-Type", "application/json; charset=utf-8");
                    response.end(JSON.stringify({}));*/
                });
            }
        break;
        case "PUT":
            var informacion = ""
            request.on("data", info =>{
                informacion += info.toString();
            });
            request.on("end", info =>{
                console.log("termine de leer");
                var objetoModificarPersona = JSON.parse(informacion);
                objetoItems.arreglo_items[objetoModificarPersona.id] = objetoModificarPersona;
                fs.writeFileSync("./json/items.json", JSON.stringify(objetoItems), "utf8");

                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json; charset=utf-8");
                response.end(JSON.stringify({"respuesta": "persona modificada correctamente"}));
            });
        break;
        case "DELETE":
            console.log("Estas intentando borrar a alguien");
            request.on("data", info =>{
                var objetoItemABorrar = JSON.parse(info.toString());

                objetoItems.arreglo_items.splice(objetoItemABorrar.id, 1);

                console.log(objetoItems.arreglo_items);
                fs.writeFileSync("./json/items.json", JSON.stringify(objetoItems), "utf8");

                response.statusCode = 200;
                response.setHeader("Content-Type", "application/json; charset=utf-8");
                response.end(JSON.stringify({"respuesta": "elemento eliminado satisfactoriamente"}));
            });
        break;
        case "OPTIONS":
            response.writeHead(204);
            response.end();
            
            break;
    }
    
});

server.listen(puerto, () => {
    console.log("Servidor encendido ejecutandose en http://localhost:" + puerto);
});
