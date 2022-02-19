export const CHANGE_TITLE = 'offer/title/change';
export const CHANGE_COMPANY_NAME = 'offer/companyName/change';

export const changeTitle = (title) => ({
    type: CHANGE_TITLE,
    payload: { title },
});

export const changeCompanyName = (companyName) => ({
    type: CHANGE_COMPANY_NAME,
    payload: { companyName },
});
