import React from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { FULL } from 'tree/selectable';
import { categoryRootNodeIds, categoryById } from './selector';
import { toggleSelectCategory } from './action';

import './select.css';

export const Option = ({ id, parentName }) => {
    const { name, children, selectMode } = useSelector(categoryById(id));
    return (
        <>
            { children.length > 0
                ? <option disabled value={id}>{`${parentName}/${name}`}</option>
                : <option value={id} hidden={selectMode === FULL}>{name}</option> }
            { (children.length > 0)
                && children.map((childId) => (
                    <Option key={childId} id={childId} parentName={`${parentName}/${name}`} />)) }
        </>
    );
};

export const CategorySelect = () => {
    const rootNodeIds = useSelector(categoryRootNodeIds, shallowEqual);
    const dispatch = useDispatch();
    return (
        <select
            className="CategorySelect"
            value=""
            onChange={(e) => dispatch(toggleSelectCategory(e.target.value))}
        >
            <option value="" disabled>...add category</option>
            { rootNodeIds.map((id) => <Option key={id} id={id} parentName="" />) }
        </select>
    );
};
