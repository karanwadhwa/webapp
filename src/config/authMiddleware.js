const bcrypt = require("bcryptjs");
const { dbconn } = require("./db");

module.exports = (req, res, next) => {
  const token = req.header("authorization");

  if (!token) {
    return res.status(401).json({ error: "Authentication required to access this route" });
  }

  try {
    const encoded = token.split(" ")[1];
    const decoded = Buffer.from(encoded, "base64").toString();
    const [username, password] = decoded.split(":");

    let queryString = "SELECT * FROM users WHERE username = ?";
    dbconn.query(queryString, [username], (err, result) => {
      if (err) throw err;
      if (result && result.length > 0) {
        const user = result[0];
        if (bcrypt.compareSync(password, user.password)) {
          delete user.password;
          req.user = user;
          next();
        } else return res.status(401).json({ error: "Invalid credentials" });
      } else {
        return res.status(400).json({ error: "User does not exist" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: "Invalid authentication token" });
  }
};
