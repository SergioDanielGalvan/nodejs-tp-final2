import { db } from "./firebase.js";
import { collection, getDocs, doc, getDoc, addDoc, updateDoc, deleteDoc } from "firebase/firestore";
  
const productosCollection = collection(db, "productos");

export const getAllProductos = async () => {
  try {
    const snapshot = await getDocs(productosCollection);
    const productos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    if ( !productos ) {
      return {"error": "Productos no encontrados"};
    }
    return productos;
  } catch (error) {
    console.error('Error al obtener productos desde Firestore:', error);
    throw error;
  }
  finally {
  }
}

export const getAllProductosWithStock = async () => { 
  try {
    const snapshot = await getDocs(productosCollection);
    const productos = snapshot.docs
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(producto => producto.stock > 0);  
    if ( !productos ) {
      return {"error": "Productos no encontrados"};
    }
    return productos;
  }
  catch ( error ) {
    console.error('Error al obtener productos con stock desde Firestore:', error);  
    throw error;
  } 
  finally {
  }
}

export const getProductoById = async (id) => {  
  try {
    const snapshot = await getDocs(productosCollection);
    const productos = snapshot.docs 
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .find(producto => producto.id === id);
    if ( !productos ) {
      return {"error": "Producto no encontrado"};
    }
    return productos;
  }
  catch ( error ) {
    console.error('Error al obtener producto por ID desde Firestore:', error);  
    throw error;
  }   
  finally {
  }
};

export const getAllProductosById2  = async ( id ) => {
  try {
    // Quizás es más eficiente que traer toda la colección e iterar con Map
    const productoRef = doc(productosCollection, id);
    const snapshot = await getDoc(productoRef);
    return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
  }
  catch ( error ) {
    console.error('Error al obtener producto por ID desde Firestore:', error);  
    throw error;
  } 
  finally {
  }
};

export const getProductoByNombre = async ( nombre ) => {
  try {
    const snapshot = await getDocs(productosCollection);
    const productos = snapshot.docs 
      .map(doc => ({ id: doc.id, ...doc.data() }))
      .filter(producto => producto.nombre.startsWith(nombre));
    if ( !productos ) {
      return { "error": "No se encontraron productos"};
    } 
    return productos;
  } catch ( error ) {
    console.error('Error al obtener producto por nombre desde Firestore:', error);  
    throw error;
  } 
  finally {
  }
};

export const updateStockById = async (id, stock) => { 
  try {
    // Validaciones previas
    if (!id || typeof id !== 'string') {
      throw new Error("ID de producto inválido");
    }
    
    if (typeof stock !== 'number' || stock < 0) {
      throw new Error("El stock debe ser un número positivo");
    }
    
    // Referencia al documento
    const productoRef = doc(db, "productos", id);
    
    // Verificar que el documento existe antes de actualizar
    const productoSnapshot = await getDoc(productoRef);
    
    if (!productoSnapshot.exists()) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }
    
    // Actualizar stock
    await updateDoc(productoRef, {
      stock: stock,
      fechamodificacion: new Date()
    });
    
    return { 
      success: true, 
      message: "Stock actualizado correctamente",
      id: id,
      stockAnterior: productoSnapshot.data().stock,
      nuevoStock: stock
    };
    
  } catch (error) {
    console.error('Error al actualizar stock en Firestore:', error);
    throw error;
  }
};

export const deleteProductoById = async ( id ) => {
  try {
    const productoRef = doc(productsCollection, id);
    const snapshot = await getDoc(productoRef);

    if (!snapshot.exists()) {
      return false;
    }

    await deleteDoc(productoRef);
    return true;
  } catch ( error ) {
    console.error('Error al eliminar producto en Firestore:', error);
    throw error;
  } 
};

export const createProducto = async ( nombre, precio, categorias, stock ) => {
  try {
    // En el ejemplo de la cátedra no se validan los datos antes de insertarlos
    // Se pasa directo el objeto del Body y se lo inserta directo
    const nuevoProducto = {
      nombre, 
      precio,
      categorias,
      stock,
      fechaalta: new Date(),
      fechamodificacion: new Date(),
      operadoralta: 1,
      operadormodificacion: 1
    };
    const docRef = await addDoc(productosCollection, nuevoProducto);
    return { id: docRef.id, ...nuevoProducto };
  }
  catch (error) {
    console.error('Error al crear producto en Firestore:', error);
    throw error;
  }
  finally {
  }
};

export const updateProductoWithStock = async ( id, stock ) => {
  try {
    // Validaciones previas
    if (!id || typeof id !== 'string') {
      throw new Error("ID de producto inválido");
    }
    if (typeof stock !== 'number' || stock < 0) {
      throw new Error("El stock debe ser un número positivo");
    }
    // Referencia al documento
    const productoRef = doc(db, "productos", id);
    // Verificar que el documento existe antes de actualizar
    const productoSnapshot = await getDoc(productoRef);
    if (!productoSnapshot.exists()) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    } 
    // Actualizar stock
    await updateDoc(productoRef, {
      stock: stock,
      fechamodificacion: new Date()
    });
    return { 
      success: true, 
      message: "Stock actualizado correctamente",
      id: id,
      stockAnterior: productoSnapshot.data().stock,
      nuevoStock: stock
    }; 
  } catch (error) {
    console.error('Error al actualizar stock en Firestore:', error);
    throw error;
  } 
  finally {
    // cierre
  }
};

export const updateProductoWithPrecio = async ( id, precio ) => {  
  try {
    // Validaciones previas
    if (!id || typeof id !== 'string') {
      throw new Error("ID de producto inválido");
    }
    if (typeof precio !== 'number' || precio < 0) {
      throw new Error("El precio debe ser un número positivo");
    }
    // Referencia al documento
    const productoRef = doc(db, "productos", id);
    // Verificar que el documento existe antes de actualizar
    const productoSnapshot = await getDoc(productoRef);
    if (!productoSnapshot.exists()) {
      throw new Error(`Producto con ID ${id} no encontrado`);
    }
    // Actualizar precio
    await updateDoc(productoRef, {
      precio: precio,
      fechamodificacion: new Date()
    });
    return { 
      success: true, 
      message: "Precio actualizado correctamente",
      id: id,
      precioAnterior: productoSnapshot.data().precio,
      nuevoPrecio: precio
    }; 
  } catch (error) {
    console.error('Error al actualizar precio en Firestore:', error);
    throw error;
  }
  finally {
    // cierre
  } 
};