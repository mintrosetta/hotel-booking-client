import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:9192/api"
});

// This function create rooms
export async function addRoom(photo, roomType, price) {
    const form = new FormData();
    form.append("photo", photo);
    form.append("roomType", roomType);
    form.append("price", price);

    const response = await api.post("/rooms", form);

    return (response.status === 201);
}

// This function get all rooms types from database
export async function getRoomTypes() {
    try {
        const response = await api.get("/rooms/types");

        return response.data;
    } catch (e) {
        console.log(e);
        throw new Error("Error fetching room types");
    }
}