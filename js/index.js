//Consultar información de la API
//se crea una variable para consultar la ruta de la api en el navegador
var url ="https://fakestoreapi.com/products";
var modal=new bootstrap.Modal(document.getElementById('modelId'),{keyboard:false});

var aplicacion = new function(){
            
    this.productos=document.getElementById("productos");
    this.modalProducto=document.getElementById("modalProducto");
            
    this.modalIMG=document.getElementById("modalIMG");
    this.nombreProducto=document.getElementById("nombreProducto");
    this.descripcionProducto=document.getElementById("descripcionProducto");
    this.precioProducto=document.getElementById("precioProducto");

     //metodo para leer los datos en cada fila de la tabla
    this.Leer=function(){
        var datos ="";
                
        //consultador y mostrar los datos de la API por medio de la url
        //listado de archivos de forma descendente
        fetch('https://fakestoreapi.com/products?sort=desc')
        .then(res=>res.json())
        .then((respuesta)=>{ //recepcion de respuesta sobre la información que devuelve
            console.log(respuesta);

            //mostrar los datos de la API en el tbody
            //map nos ayuda a recoger cada uno de los datos que se envien de la db hacia la aplicacion
            respuesta.map(
                function(productos,index,array){
                    datos+="<tr>";
                    datos+="<td>"+productos.id+"</td>";
                    datos+="<td>"+productos.title+"</td>";
                    datos+="<td>"+productos.price+"</td>";
                    datos+='<td><div class="btn-group" role="group" aria-label=""><button type="button" class="btn btn-success" onclick="aplicacion.Mostrar('+productos.id+')">Details</button></div>'+'</td>';
                    datos+="</tr>";
                });
                return this.productos.innerHTML=datos;

        })
        .catch(console.log)
 
    };
            
        
            
    //metodo para visualizar los datos del producto en el modal por medio del ID
    this.Mostrar=function(id){
        console.log(id);
        fetch("https://fakestoreapi.com/products/"+id)
        .then(resp=>resp.json())
        .then((respDatos)=>{
            console.log(respDatos)
            this.modalIMG.src=respDatos.image;
            this.nombreProducto.innerHTML=respDatos.title;
            this.descripcionProducto.innerHTML=respDatos.description;
            this.precioProducto.innerHTML="$"+respDatos.price;
        })
        .catch(console.log)
        modal.show();
    };

}
aplicacion.Leer();