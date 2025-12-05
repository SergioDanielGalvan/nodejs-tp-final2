// src/controladores/authControlers.js
import jwt from "jsonwebtoken";
import connection from "../controladores/conexion_db.js";
import { query } from "../controladores/pool_mySQL.js/";

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    let sql = 'SELECT email, password, intentos FROM usuarios WHERE email = ? AND password = ?';
    const params = [email, password];
    const usuario = await query(sql, params);
  } catch (error) {
    
  }
  finally { }


  if (email == "sdg@gmail.com" && password == "1234!") {
    const token = jwt.sign({ email }, process.env.JWT_SECRET || "V1trS3cr3t!", {
      expiresIn: "1h",
    });

    return res.json({ token });
  }

 res.status(401).json({ error: "Credenciales inválidas" });
};
