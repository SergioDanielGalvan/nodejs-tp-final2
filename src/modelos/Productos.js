import fs from "fs/promises";
import path from "path";

// let products = [];

const __dirname = import.meta.dirname;
// console.log(path.join(__dirname, "products.json"))

// fs.readFile(path.join(__dirname, "products.json"), "utf-8", (error, data) => {
//   if (error) {
//     return console.error(error);
//   }

//   products = JSON.parse(data);

//   console.log(products);
// });

export const getAllProductos = async ( categoria, stock ) => {
  try {
    const data = await fs.readFile( path.join( __dirname, "Productos.json"), "utf-8"  );
    var productos = JSON.parse(data);

    if ( stock ) {
      productos = productos.filter( ( producto ) => producto.stock > 0 );
    }  

    if ( categoria ) {
      return productos.filter( ( producto ) =>
        producto.categorias.includes( categoria )
      );
    }  
    return productos;

  } catch (error) {
    console.error(error);
  }
  finally {
  }
};

export const getProductoById = async (id) => {
  try {
    const data = await fs.readFile( path.join(__dirname, "Productos.json"), "utf-8" );
    var productos = JSON.parse(data);

    var producto = productos.find((item) => item.id == id);
    if ( !producto ) {  
      return {"error": "Producto no encontrado"};
    }
    return producto;
  } catch ( error ) {
    console.error(error);
  }
  finally {
  }
};

export const getProductoByNombre = async ( nombre ) => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "Productos.json"),
      "utf-8"
    );

    const productos = JSON.parse(data);

    // const listaproductos = await Producto.find({ nombre: { $regex: nombre, $options: 'i' }    });
    const producto = productos.find((item) => item.nombre == nombre );

    return producto;
  } catch ( error ) {
    console.error(error);
  }
  finally {
  }
};

export const createProducto = async ( nombre, precio, categorias, stock ) => {
  const product = {
    id: Math.max( ...productos.map( p => p.id ) ) + 1,//Date.now(),
    nombre,
    precio,
    categorias,
    stock,
  };

  try {
    const data = await fs.readFile( path.join(__dirname, "Productos.json"), "utf-8" );

    const productos = JSON.parse(data);

    productos.push(producto);

    await fs.writeFile(
      path.join(__dirname, "products.json"),
      JSON.stringify(productos)
    );

    return producto;
  } catch (error) {
    console.error(error);
  }
  finally {
  }

};