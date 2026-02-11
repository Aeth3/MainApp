import axios from "axios";


export const getCats = async () => {
    try {
        const response = await axios.get(
            "https://api.thecatapi.com/v1/images/search?limit=10",
            {
                headers: {
                    "x-api-key": "live_VihJKMTvFTqbXMqYgQpKVtnyO5K3ZZ4dRrDbswIxgV7kAE1gmI92KG8WxC45lXWM", // ✅ required for TheCatAPI (not Bearer)
                },
            }
        );

        console.log("Response:", response.data);
        return response.data; // ✅ Fix: TheCatAPI returns an array directly, not { data: ... }
    } catch (error) {
        console.error("Error fetching cats:", error);
        return null; // always return something (avoid undefined)
    }
};
