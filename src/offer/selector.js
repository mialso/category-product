import { OFFER_MODEL_ID } from './constant';

export const offerState = (selector) => (state) => selector(state[OFFER_MODEL_ID]);
export const offerTitle = offerState((state) => state.title);
export const offerCompanyName = offerState((state) => state.companyName);
