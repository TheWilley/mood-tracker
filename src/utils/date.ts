// 'sv' locale gives YYYY-MM-DD in local time (toISOString would shift to UTC)
export const toKey = (d: Date) => d.toLocaleDateString('sv');

export const todayKey = () => toKey(new Date());
