import jwt from "jsonwebtoken";

export const login = (req, res) => {
  const { email, password } = req.body;

  if (email == "sdg@gmail.com" && password == "1234!") {
    const token = jwt.sign({ email }, "V1trS3cr3t!", {
      expiresIn: "1h",
    });

    return res.json({ token });
  }

  res.status(401).json({ error: "Credenciales inválidas" });
};