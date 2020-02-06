import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    categoryEdited, categoryMode, categoryPath, categoriesByProduct,
} from 'category/selector';
import { submitCategory, deleteCategory, categoryNormalMode } from 'category/action';
import { MODE_EDIT, MODE_CREATE } from 'category/constants';

import './input.css';

export const CategoryActionItem = ({ id, onClick }) => {
    const categoryString = useSelector(categoryPath(id));
    return (
        <span className="CategoryItem CategoryItem-Action">
            <span className="CategoryItem-Name">{categoryString}</span>
            <button
                className="CategoryItem-Action--close"
                onClick={onClick}
                type="button"
            >
                <span className="fas fa-times" />
            </button>
        </span>
    );
};

export const CategoryItems = ({ productId }) => {
    const categoryIds = useSelector(categoriesByProduct(productId));
    if (!(Array.isArray(categoryIds) && categoryIds.length)) {
        return null;
    }
    return (
        <div className="CategoryItemsList">
            { categoryIds.map((catId) => <CategoryItem key={catId} id={catId} />) }
        </div>
    );
};
export const CategoryItem = ({ id }) => {
    const categoryString = useSelector(categoryPath(id));
    return (
        <span className="CategoryItem">{categoryString}</span>
    );
};

export const CategoryInput = (props) => {
    const {
        onSubmit, onDelete, title, onClose, ...givenCat
    } = props;
    const [ { name, parentId }, setState ] = useState(givenCat);
    useEffect(() => onClose, [ onClose ]);
    return (
        <div className="CategoryInput">
            <h4>{ title }</h4>
            <div className="AppInput-Field">
                <label>Pick name:</label>
                <input
                    className="AppInput"
                    type="text"
                    value={name}
                    onChange={(e) => setState({ name: e.target.value, parentId })}
                />
            </div>
            <div className="AppInput-Field">
                <label>Parent Category: </label>
                <CategoryItem id={parentId} />
            </div>
            <div className="CategoryInput-Action">
                { onDelete
                    && <button
                        className="AppButton"
                        type="button"
                        onClick={onDelete}
                    >
                        Delete
                    </button> }
                <button
                    className="AppButton"
                    type="button"
                    disabled={!name || name === givenCat.name}
                    onClick={() => onSubmit({ name, parentId })}
                >
                    Submit
                </button>
            </div>
        </div>
    );
};

export const CategoryEdit = () => {
    const { name, parentId, id } = useSelector(categoryEdited);
    const dispatch = useDispatch();
    return (
        <CategoryInput
            title="Category Edit"
            name={name}
            parentId={parentId}
            onClose={() => dispatch(categoryNormalMode())}
            onSubmit={(item) => dispatch(submitCategory(item))}
            onDelete={() => dispatch(deleteCategory(id))}
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

export const CategoryEditor = () => {
    const mode = useSelector(categoryMode);
    switch (mode) {
        case MODE_EDIT: return (<CategoryEdit />);
        case MODE_CREATE: return (<CategoryCreate />);
        default: return null;
    }
};
