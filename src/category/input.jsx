import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { categoryEdited, categoryMode, categoryPath } from './selector';
import { submitCategory, categoryNormalMode } from './action';
import { MODE_EDIT, MODE_CREATE } from './constants';

import './input.css';

export const CategoryItem = ({ id }) => {
    const categoryString = useSelector(categoryPath(id));
    return (
        <span className="CategoryItem">{categoryString}</span>
    );
};

export const CategoryInput = (props) => {
    const {
        onSubmit, title, showParentInput, onClose, ...givenCat
    } = props;
    const [ { name, parentId }, setState ] = useState(givenCat);
    useEffect(() => onClose, [ onClose ]);
    return (
        <div className="CategoryInput">
            <h4>{ title }</h4>
            <div className="CategoryInput-Field">
                <label>Pick name:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setState({ name: e.target.value, parentId })}
                />
            </div>
            <div className="CategoryInput-Field">
                <label>Parent Category: </label>
                <CategoryItem id={parentId} />
            </div>
            <button
                type="button"
                disabled={!name || name === givenCat.name}
                onClick={() => onSubmit({ name, parentId })}
            >
                Submit
            </button>
        </div>
    );
};

export const CategoryEdit = () => {
    const { name, parentId } = useSelector(categoryEdited);
    const dispatch = useDispatch();
    return (
        <CategoryInput
            title="Category Edit"
            name={name}
            parentId={parentId}
            onClose={() => dispatch(categoryNormalMode())}
            onSubmit={(item) => dispatch(submitCategory(item))}
        />
    );
};

export const CategoryCreate = () => {
    const { name, parentId } = useSelector(categoryEdited);
    const dispatch = useDispatch();
    return (
        <CategoryInput
            title="Category Create"
            name={name}
            parentId={parentId}
            onClose={() => dispatch(categoryNormalMode())}
            onSubmit={(item) => dispatch(submitCategory(item))}
        />
    );
};

export const CategoryModal = () => {
    const mode = useSelector(categoryMode);
    switch (mode) {
        case MODE_EDIT: return (<CategoryEdit />);
        case MODE_CREATE: return (<CategoryCreate />);
        default: return null;
    }
};
