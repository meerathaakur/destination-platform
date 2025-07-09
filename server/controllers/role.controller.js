import User from "../models/user.model.js";

export async function updateUserRole(req, res) {
    const { userId, role } = req.body;

    if (!["user", "admin", "superadmin"].includes(role)) {
        return res.status(400).json({ success: false, error: "Invalid role" });
    }

    try {
        let user = await User.findById(userId);
        // console.log(user)
        if (!user) {
            return res.status(404).json({ success: false, error: "User not found" });
        }
        console.log(`Role updated: ${user.email} (${user._id}) -> ${role} by ${req.user.email}`);
        if (req.user.id === userId) {
            return res.status(403).json({ success: false, error: "You cannot change your own role" });
        }

        // Only superadmins can assign 'superadmin' role
        if (role === "superadmin" && req.user.role !== "superadmin") {
            return res.status(403).json({ success: false, error: "Only superadmins can assign this role" });
        }

        // Only admins and superadmins can assign 'admin' or 'user' roles
        if (role === "admin" && req.user.role !== "superadmin") {
            return res.status(403).json({ success: false, error: "Only superadmins can assign admins" });
        }

        user.role = role;
        await user.save();

        res.json({ success: true, message: `User role updated to ${role}` });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ success: false, error: "Server error" });
    }
}
