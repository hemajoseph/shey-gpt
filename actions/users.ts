'use server';
import { connectMongoDB } from "@/lib/database";
import UserModel from "@/models/user-model";

connectMongoDB()

export const saveAndGetCurrentUser = async () => {
    const userObj_mock = {
            _id: "mock-user-id-123",
            name: "Khooshi",
            email: "Khooshii@default.com",
            password  : '123kh'
        };
        console.log("Returning mock user", userObj_mock);
        return {
            success: true,
            message: "Mock user returned",
            data: userObj_mock
        };
};