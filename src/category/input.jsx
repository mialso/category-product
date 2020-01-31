import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { categoryEdited, categoryMode } from './reducer';
import { submitCategory, categoryNormalMode } from './action';
import { MODE_EDIT, MODE_CREATE } from './constants';

export const CategoryInput = (props) => {
    const {
        onSubmit, title, showParentInput, onClose, ...rest
    } = props;
    const [ { name, parentId }, setState ] = useState(rest);
    useEffect(() => onClose, [ onClose ]);
    return (
        <div className="CategoryInput">
            <h4>{ title }</h4>
            <label>Pick name:</label>
            <input
                type="text"
                value={name}
                onChange={(e) => setState({ name: e.target.value })}
            />
            { showParentInput
                && (
                    <>
                        <label>Pick Parent</label>
                        <input
                            type="text"
                            onChange={(e) => setState({ parentId: e.target.value })}
                        />
                    </>
                )}
            <button
                type="button"
                disabled={!name}
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
            showParentInput
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
