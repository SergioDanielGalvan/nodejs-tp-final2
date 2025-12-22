// src/controladores/OperadoresControlador.js
import e from "express";
import * as modelo from "../modelos/Operadores.js";
import { verifyToken, extraerPayload } from "../utiles/token_generator.js";

export const getAllOperadores = async ( req, res ) => {
    try {
        const operadores = await modelo.getAllOperadores();
        if ( !operadores ) {
            return res.status(404).json({ error: "Operadores no encontrados" });
        }
        res.status(200).json( operadores );
    } 
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }   
    finally {
    }
};

export const getOperadorById = async ( req, res ) => {
    try {   
        const { id } = req.params;
        const operador = await modelo.getOperadorById( id );
        if ( !operador ) {
            return res.status(404).json({ error: "Operador no encontrado" });
        }
        res.status(200).json( operador );
    }
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    }
};

export const getOperadorByEmail = async ( req, res ) => {
    try {   
        const { email } = req.params;
        const operador = await modelo.getOperadorByEmail( email );
        if ( !operador ) {
            return res.status(404).json({ error: "Operador no encontrado" });
        }
        res.status(200).json( operador );
    }
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    }   
};
export const createOperador = async ( req, res ) => {
    try {
        if ( !req.body || Object.keys(req.body).length === 0 ) {
            return res.status(400).json({ error: "Datos del operador son obligatorios" });
        }
        // Checks de Auth del operador a crear pueden ir aquí
        const token = req.headers.authorization;
        const operadorData = req.body;
        const newOperador = await modelo.createOperador( operadorData, token );
        res.status(201).json( newOperador );
    } 
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    }   
};

export const deleteOperadorByEmail = async ( req, res ) => {
    try {
        const { email } = req.params;
        const token = req.headers.authorization;
        const result = await modelo.deleteOperadorByEmail( email, token ); 
        if ( result.affectedRows === 0 ) {
            return res.status(404).json({ error: "Operador no encontrado" });
        }
        res.status(200).json({ message: "Operador eliminado correctamente" });
    } 
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    };
};

export const updateOperadorByEmail = async ( req, res ) => {
    try {
        const { email } = req.params;
        const operadorData = req.body;
        const token = req.headers.authorization;
        const result = await modelo.updateOperadorByEmail( email, operadorData, token );
        if ( result.affectedRows === 0 ) {
            return res.status(404).json({ error: "Operador no encontrado" });
        }
        res.status(200).json({ message: "Operador actualizado correctamente" });
    }
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    };
};

export const deleteOperadorById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization;
        const result = await modelo.deleteOperadorById( id, token );
        if ( result.affectedRows === 0 ) {
            return res.status(404).json({ error: "Operador no encontrado" });
        }

        res.status(200).json({ message: "Operador eliminado correctamente" });
    }
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    };
};

export const updateOperadorById = async ( req, res ) => {
    try {
        const { id } = req.params;
        const operadorData = req.body;
        const token = req.headers.authorization;
        const result = await modelo.updateOperadorById( id, operadorData, token );
        if ( result.affectedRows === 0 ) {
            return res.status(404).json({ error: "Operador no encontrado" });
        }
        res.status(200).json({ message: "Operador actualizado correctamente" });
    }
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    };
};

export const resetIntentosByID = async ( req, res ) => {
    try {
        const { id } = req.params;
        const token = req.headers.authorization;
        const result = await modelo.resetIntentosByID( id, token );
        if ( result.affectedRows === 0 ) {
            return res.status(404).json({ error: "Operador no encontrado" });
        }
        res.status(200).json({ message: "Intentos reseteados correctamente" });
    }
    catch ( error ) {
        res.status(500).json({ error: "Error del servidor" });
    }
    finally {
    };
};