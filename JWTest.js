import jwt from "jsonwebtoken";
import crypto from "crypto";
import dotenv from 'dotenv';

import { argv } from 'process';
import { writeFile } from 'node:fs/promises';


dotenv.config();
const secretKey = process.env.JWT_CLAVE_TOKEN || 'U1tr@S3cr3t!';

const payloadJSON = {
  "email": "papapitufo@gmail.com",
  "id": "L2gpNTziT96sTHZEBNf6"
}

const generateToken = ( payload ) => {
  const user = {id: payload.id, email: payload.email};
  const tokenID = jwt.sign( payload, secretKey, { expiresIn: process.env.JWT_TIEMPO_EXPIRACION || '1h' } );
  return tokenID;
}

const verifyToken = ( token ) => {
  try {
    const decoded = jwt.verify( token, secretKey );
    return decoded;
    } catch ( error ) {         
    }
    finally {
    }
    return null;
}

const extraerPayload = ( token ) => {
  try {
    const decoded = jwt.decode( token, { complete: true } );
    return decoded.payload; 
    } catch ( error ) {
    }
    finally {
    }
    return null;
}

const token = generateToken( payloadJSON );
console.log("Token generado: ", token );
const decoded = verifyToken( token );
console.log("Token verificado: ", decoded );    
const payloadExtraido = extraerPayload( token );
console.log("Payload extraído: ", payloadExtraido );
console.log("email extraído: ", payloadExtraido.email );
console.log("id extraído: ", payloadExtraido.id );

if ( argv[2] == 'savefile' ) {
  await writeFile( 'token.txt', token );
  console.log("Token guardado en token.txt" );
}
