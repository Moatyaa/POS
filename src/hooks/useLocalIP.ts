import { useState, useEffect } from 'react';

const useNetworkIP = (): string | null => {
    const [networkIP, setNetworkIP] = useState<string | null>(null);

    useEffect(() => {
        const fetchNetworkIP = async () => {
            try {
                const response = await fetch('/api/getNetworkIP');
                const data: { networkIP: string[] } = await response.json();
                setNetworkIP(data.networkIP[0] || 'Not Found');
            } catch (error) {
                console.error('Failed to fetch Network IP:', error);
                setNetworkIP('Error fetching IP');
            }
        };

        fetchNetworkIP();
    }, []);

    return networkIP;
};

export default useNetworkIP;
