export const SAVE_BILLING = 'billing_save';

export const saveBilling = (season: string, gameId: string, data: any) => ({
    type: SAVE_BILLING,
    payload: { season, gameId, data }
});
