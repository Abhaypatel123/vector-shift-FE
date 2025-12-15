import { useState } from "react";
export function useApi(apiFunc) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    const request = async (...args) => {
        setLoading(true);
        setError(null);
        try {
            const result = await apiFunc(...args);
            setData(result);
            return result;
        } catch (err) {
            setError(err.message || "Something went wrong");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return { request, loading, data, error };
}
