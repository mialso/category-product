import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { readCategories, createCategory } from './action';
import { NOT_ASKED, READY } from '../constants';
import { categoryById, categoryRootNodeIds } from './reducer';

import './list.css';

const mapStateToProps = ({ category }) => category;

export const RequireCategories = ({ children }) => {
    const category = useSelector(mapStateToProps);
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
    <div className="CategoryList" style={{ paddingLeft: 24 * level }}>
        { itemIds.map(
            (id) => (
                <Category key={id} id={id} level={level} />
            ),
        )}
    </div>
);

export const Category = ({ id, level }) => {
    const [ isOpen, toggleOpen ] = useState(false);
    const dispatch = useDispatch();
    const { name, children } = useSelector(categoryById(id));
    return (
        <div className="Category">
            { !!(Array.isArray(children) && children.length) && (
                <button
                    type="button"
                    onClick={() => toggleOpen(!isOpen)}
                    className="Category-Button"
                >
                    <i className="fas fa-angle-down" />
                </button>
            )}
            {name}
            <button
                type="button"
                onClick={() => dispatch(createCategory({ parentId: id }))}
                className="Category-Button"
            >
                <i className="fas fa-plus-square" />
            </button>
            { isOpen && <List itemIds={children} level={level + 1} /> }
        </div>
    );
};

export const CategoryList = () => {
    const categories = useSelector(categoryRootNodeIds, shallowEqual);
    const dispatch = useDispatch();
    return (
        <div className="Category">
            <List itemIds={categories} level={0} />
            <button
                type="button"
                onClick={() => dispatch(createCategory({ parentId: null }))}
                className="Category-Create"
            >
                Create Category
            </button>
        </div>
    );
};
