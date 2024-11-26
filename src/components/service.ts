import { API_URL } from "./constant";

export const fetchTableData = async () => {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
}