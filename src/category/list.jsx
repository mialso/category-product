import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux';
import { readCategories, createCategory } from './action';
import { NOT_ASKED, READY } from '../constants';
import { categoryByName, categoryRootNodeIds } from './reducer';

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

const List = ({ items }) => (
    <div className="CategoryList">
        { items.map(
            (name) => (
                <Category key={name} name={name} />
            ),
        )}
    </div>
);

export const Category = ({ name }) => {
    const [ isOpen, toggleOpen ] = useState(false);
    const dispatch = useDispatch();
    const { children, level = 0 } = useSelector(categoryByName(name));
    return (
        <div className="Category" style={{ marginLeft: 8 * level }}>
            { !!(Array.isArray(children) && children.length) && (
                <button
                    type="button"
                    onClick={() => toggleOpen(!isOpen)}
                    className="Category-Expand"
                >
                    EX
                </button>
            )}
            {name}
            <button
                type="button"
                onClick={() => dispatch(createCategory({ parent: name }))}
                className="Category-Create"
            >
                Create Category
            </button>
            { isOpen && <List items={children} /> }
        </div>
    );
};

export const CategoryList = () => {
    const categories = useSelector(categoryRootNodeIds, shallowEqual);
    return (
        <div className="Category">
            <List items={categories} />
        </div>
    );
};
