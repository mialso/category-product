import React from 'react';

export const formatDate = (date) => {
    if (!date) {
        return '';
    }
    return new Date(date * 1000).toISOString().split('T')[0];
};

export const ProductInput = (props) => {
    const { title, product, onChange } = props;
    // useEffect(() => onUnmount, [ onUnmount ]);
    return (
        <div className="ProductInput">
            <h4>{ title }</h4>
            <div className="ProductInput-Field">
                <label>Pick name:</label>
                <input
                    type="text"
                    value={product.name}
                    onChange={(e) => onChange({ name: e.target.value })}
                />
            </div>
            <div className="ProductInput-Field">
                <label>Pick price:</label>
                <input
                    type="text"
                    value={product.price}
                    onChange={(e) => onChange({ price: e.target.value })}
                />
            </div>
            <div className="ProductInput-Field">
                <label>Pick expire date:</label>
                <input
                    type="date"
                    value={formatDate(product.expireDate)}
                    onChange={(e) => onChange({ expireDate: e.target.valueAsNumber / 1000 || 0 })}
                />
            </div>
        </div>
    );
};
