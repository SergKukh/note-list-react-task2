export const getDate = (): string => {
    return new Date().toISOString().split('T')[0];
}

export const formatDate = (date: string): string => {
    return date.split('-').reduceRight((prev, item) => prev += '.' + item);
}

export const getDatesFromString = (string: string): string => {
    let str = '';
    const dates = string.match(/\d{1,2}([\/.-])\d{1,2}\1\d{2,4}/g);
    if (dates) {
        str = dates.join(', ');
    }
    return str || '';
}