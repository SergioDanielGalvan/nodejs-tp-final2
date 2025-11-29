import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

const secretKey = process.env.JWT_CLAVE_TOKEN || 'U1tr@S3cr3t!';

export const generateToken = ( payload ) => {
  const user = {id: payload.id, email: payload.email};
  const tokenID = jwt.sign( payload, secretKey, { expiresIn: process.env.JWT_TIEMPO_EXPIRACION || '1h' } );
  return tokenID;
}

export const verifyToken = ( token ) => {
  try {
    const decoded = jwt.verify( token, secretKey );
    return decoded;
    } catch ( error ) {         
    }
    finally {
    }
    return null;
}