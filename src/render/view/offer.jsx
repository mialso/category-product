import React from 'react';
import { Case } from '../common/case';
import { CreateOfferSteps } from '../offer/create';
import { OfferPreview } from '../offer/preview';
import { TitlePicker } from '../offer/title';
import { ClientPicker } from '../offer/client';
import { GreetingPicker } from '../offer/greeting';

const HeadStep = () => (
    <div>
        <TitlePicker />
        <ClientPicker />
        <GreetingPicker />
    </div>
);

const stepById = {
    head: HeadStep,
};

export const OfferView = () => (
    <div>
        <div>Offer</div>
        <div>Action</div>
        <div>
            <span>Create</span>
            <span>View</span>
        </div>
        <CreateOfferSteps />
        <Case match="head" map={stepById} />
        <OfferPreview />
    </div>
);
