import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { categoryRootNodeIds } from './reducer';
import { List } from './list';

export const CategoryPicker = () => {
    const categories = useSelector(categoryRootNodeIds, shallowEqual);
    const dispatch = useDispatch();
    return (
        <List itemIds={categories} level={0} />
    );
};
