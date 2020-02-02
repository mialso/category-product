import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import classnames from 'classnames';
import { EMPTY, PARTIAL, FULL } from 'tree/selectable';
import {
    readCategories, createCategory, updateCategory, toggleSelectCategory,
} from './action';
import { NOT_ASKED, READY } from '../constants';
import { categoryState, categoryById, categoryRootNodeIds } from './reducer';

import './list.css';

export const RequireCategories = ({ children }) => {
    const category = useSelector(categoryState);
    const dispatch = useDispatch();
    useEffect(() => {
        if (category.dataStatus === NOT_ASKED) {
            dispatch(readCategories());
        }
    }, []);
    if (category.dataStatus !== READY) {
        return null;
    }
    return (<>{children}</>);
};

const List = ({ itemIds, level }) => (
    <div className="CategoryList" style={{ paddingLeft: 20 * level }}>
        { itemIds.map(
            (id) => (
                <Category key={id} id={id} level={level} />
            ),
        )}
    </div>
);

export const Category = ({ id, level, isSelectOnly }) => {
    const [ isOpen, toggleOpen ] = useState(false);
    const dispatch = useDispatch();
    const { name, children, selectMode } = useSelector(categoryById(id));
    return (
        <>
            <div className="Category">
                { (Array.isArray(children) && children.length)
                    ? <button
                        className="Category-Button"
                        type="button"
                        onClick={() => toggleOpen(!isOpen)}
                    >
                        { isOpen
                            ? <i className="fas fa-angle-down" />
                            : <span className="fas fa-angle-right" /> }
                    </button>
                    : <span className="Category-LeftSpacer" /> }
                <button
                    className="Category-Button Category-Name"
                    type="button"
                    onClick={() => dispatch(toggleSelectCategory(id))}
                >
                    <span
                        className={classnames({
                            'fas fa-check-circle': selectMode === FULL,
                            'fas fa-minus-circle': selectMode === PARTIAL,
                            'far fa-circle': selectMode === EMPTY,
                        })}
                    />
                    {name}
                </button>
                { !isSelectOnly
                    && <>
                        <button
                            type="button"
                            onClick={() => dispatch(updateCategory(id))}
                            className="Category-Button Category-Action"
                        >
                            <i className="fas fa-pen" />
                        </button>
                        <button
                            type="button"
                            onClick={() => dispatch(createCategory({ parentId: id }))}
                            className="Category-Button Category-Action"
                        >
                            <i className="fas fa-plus" />
                        </button>
                    </>}
            </div>
            { isOpen && <List itemIds={children} level={level + 1} /> }
        </>
    );
};

export const CategoryList = () => {
    const categories = useSelector(categoryRootNodeIds, shallowEqual);
    const dispatch = useDispatch();
    return (
        <div className="Category Category-Root">
            <List itemIds={categories} level={0} />
            <button
                type="button"
                onClick={() => dispatch(createCategory({ parentId: null }))}
                className="Category-Create"
            >
                Create root Category
            </button>
        </div>
    );
};
