const pool = require("../config/db.js");
const bcrypt = require("bcrypt");
const {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
} = require("../utils/jwt.js");

const registerService = async (name, email, password) => {
  const isFound = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (isFound.rows.length) throw new Error("Email already exists");

  const hashed_password = await bcrypt.hash(password, 10);
  const result = await pool.query(
    "INSERT INTO users (name, email, password_hash) VALUES ($1, $2, $3) RETURNING *",
    [name, email, hashed_password],
  );

  const user = result.rows[0];
  const accessToken = generateAccessToken({ id: user.id, email: user.email });
  const refreshToken = generateRefreshToken();

  const expiry_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await pool.query(
    "INSERT INTO refresh_tokens (token, user_id, expires_at) VALUES ($1, $2, $3)",
    [refreshToken, user.id, expiry_at],
  );

  return { accessToken, refreshToken, user };
};

const loginService = async (email, password) => {
  // 1. find a user by email
  const result = await pool.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  const user = result.rows[0];
  // 2. if not found throw an error
  if (!result.rows.length) throw new Error("Email isn't registered!");
  // 3. compare pass with stored hash
  const is_pass_match = await bcrypt.compare(password, user.password_hash);
  // 4. if not match throw an error
  if (!is_pass_match) throw new Error("Password isn't correct!");
  // 5. generate tokens
  const accessToken = generateAccessToken({ id: user.id, email: user.email });
  const refreshToken = generateRefreshToken();

  const expiry_at = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  await pool.query(
    "INSERT INTO refresh_tokens (token, user_id, expires_at) VALUES ($1, $2, $3)",
    [refreshToken, user.id, expiry_at],
  );

  return { accessToken, refreshToken, user };
};

module.exports = { registerService, loginService };
