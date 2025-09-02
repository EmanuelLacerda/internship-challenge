import type { AxiosError } from "axios";
import { api } from "../helpers/api";
import type { PositiveIntegerInterval } from "../models/positive_integer_interval";

export default function useLCMInterval(url: string){

    async function calculateLCMInterval(payload: PositiveIntegerInterval){
        try {
            const response = await api.post(url, payload)
            return response
        } catch (error: unknown) {
            return (error as AxiosError).response
        }
    }

    return {
        calculateLCMInterval
    };
}