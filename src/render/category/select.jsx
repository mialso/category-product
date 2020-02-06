import React from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { categoryRootNodeIds, categoryById } from 'category/selector';
import { CategoryActionItem } from './input';

import './select.css';

export const Option = ({ id, parentName, selectedIds }) => {
    const { name, children } = useSelector(categoryById(id));
    return (
        <>
            { children.length > 0
                ? <option disabled value={id}>{`${parentName}/${name}`}</option>
                : <option value={id} hidden={selectedIds.includes(id)}>{name}</option> }
            { (children.length > 0)
                && children.map((childId) => (
                    <Option key={childId} id={childId} parentName={`${parentName}/${name}`} selectedIds={selectedIds} />)) }
        </>
    );
};

export const CategorySelect = ({ selectedIds, pickCategory }) => {
    const rootNodeIds = useSelector(categoryRootNodeIds, shallowEqual);
    return (
        <select
            className="CategorySelect"
            value=""
            onChange={(e) => pickCategory(e.target.value)}
        >
            <option value="" disabled>...add category</option>
            { rootNodeIds.map((id) => <Option key={id} id={id} parentName="" selectedIds={selectedIds} />) }
        </select>
    );
};

export const CategoryPicker = ({ selectedIds, onChange }) => {
    return (
        <div className="CategoryPicker">
            <h4>Category Picker</h4>
            <div className="CategoryPicker-Items">
                { selectedIds.map((id) => <CategoryActionItem key={id} id={id} onClick={() => onChange(selectedIds.filter((sId) => sId !== id))} />) }
            </div>
            <CategorySelect
                selectedIds={selectedIds}
                pickCategory={(id) => onChange(selectedIds.concat(id))}
            />
        </div>
    );
};
