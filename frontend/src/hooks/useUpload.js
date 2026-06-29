import { useState } from "react";

export default function useUpload() {

    const [loading, setLoading] = useState(false);

    const startLoading = () => setLoading(true);

    const stopLoading = () => setLoading(false);

    return {
        loading,
        startLoading,
        stopLoading,
    };

}