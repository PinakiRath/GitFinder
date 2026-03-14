/**
 * Format large numbers into readable strings (1K, 1.2M, etc.)
 */
export const formatValue = (val) => {
    if (val >= 1000000) return (val / 1000000).toFixed(1) + 'M';
    if (val >= 1000) return (val / 1000).toFixed(1) + 'K';
    return val;
};

/**
 * Get Tailwind background-color class for a programming language
 */
export const getLanguageColor = (language) => {
    const colors = {
        JavaScript: 'bg-yellow-400',
        TypeScript: 'bg-blue-400',
        Python: 'bg-green-400',
        Java: 'bg-orange-400',
        'C++': 'bg-pink-400',
        C: 'bg-gray-400',
        Go: 'bg-cyan',
        Rust: 'bg-orange-500',
        Ruby: 'bg-red-400',
        PHP: 'bg-indigo-400',
        Swift: 'bg-orange-400',
        Kotlin: 'bg-purple-400',
        Vue: 'bg-green-400',
        CSS: 'bg-purple-400',
        HTML: 'bg-orange-400',
    };
    return colors[language] || 'bg-neon';
};

/**
 * Format ISO date string to "Mon YYYY" format
 */
export const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
        month: 'short',
        year: 'numeric',
    });
};
