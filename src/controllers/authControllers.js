const {
  registerService,
  loginService,
} = require("../services/authServices.js");

const registerController = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required!" });

    const user = await registerService(name, email, password);
    res.status(201).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "All fields are required!" });

    const user = await loginService(email, password);
    res.status(200).json(user);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = { registerController, loginController };
