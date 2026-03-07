import { useState, useEffect } from 'react';

const EXTENSION_ID = 'GaneshWayal.html-to-react-js';
const API_URL = 'https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery';

export const useMarketplaceStats = () => {
    const [stats, setStats] = useState({
        downloads: 0,
        install: 0,
        loading: true,
        error: null
    });

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(API_URL, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json;api-version=3.0-preview.1'
                    },
                    body: JSON.stringify({
                        filters: [{
                            criteria: [{
                                filterType: 7,
                                value: EXTENSION_ID
                            }]
                        }],
                        flags: 914
                    })
                });

                if (!response.ok) throw new Error('Network error');

                const data = await response.json();
                const extension = data.results[0]?.extensions[0];

                if (extension) {
                    const statistics = extension.statistics;
                    const downloadCount = statistics.find(s => s.statisticName === 'downloadCount')?.value || 0;
                    const installCount = statistics.find(s => s.statisticName === 'install')?.value || 0;

                    setStats({
                        downloads: downloadCount,
                        install: installCount,
                        loading: false,
                        error: null
                    });
                }
            } catch (err) {
                setStats(prev => ({ ...prev, loading: false, error: err.message }));
            }
        };

        fetchStats();
    }, []);

    return stats;
};
