import axios from "axios";
import Config from "../Config";

const server = async (serverIP: string): Promise<any> => {
    try {
        const response = await axios.get(`${Config.McApi}?ip=${serverIP}`);
        return response.data;
    } catch (exception) {
        return exception;
    }
};

export default {
    server,
};