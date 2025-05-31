import { User } from "../Models/User.js";

export const userRegister = async (req, res) => {
    try {
        const { name, email, password, phone, age } = req.body;

        const newUser = await User.create({
            name,
            email,
            password,
            phone,
            age,
            createdAt: new Date(),
        });

        res.json({
            success: true, 
            user: newUser
        });

    } catch (error) {
        res.status(500).json({ success: false, error: error.message });

    }

}