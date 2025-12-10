import React from 'react';
import "./common.css"

const groupProducts = (products) => {
  const map = new Map();

  products.forEach((product) => {
    const key = product.name + "-" + product.price;
    if (map.has(key)) {
      const existing = map.get(key);
      existing.quantity = (existing.quantity || 1) + (product.quantity || 1);
    } else {
      map.set(key, { ...product, quantity: product.quantity || 1 });
    }
  });

  return Array.from(map.values());
};

const ProductList = ({ products }) => {
  const uniqueProducts = groupProducts(products);

  return (
    <div className="container py-5">
      <div className="row g-4">
        {uniqueProducts.length > 0 ? (
          uniqueProducts.map((product, idx) => (
            <div className="col-sm-6 col-md-4 col-lg-3" key={idx}>
              <div className="card h-100 border-0 rounded-4 shadow-sm product-card position-relative bg-white">
                <div className="product-img-wrapper p-3 bg-light rounded-top">
                  <img
                    src={product.image || 'https://via.placeholder.com/150'}
                    className="w-100"
                    alt={product.name}
                    style={{ height: '180px', objectFit: 'contain' }}
                  />
                  <span className="badge bg-warning text-dark position-absolute top-0 end-0 m-2 rounded-pill" style={{ fontSize: '0.75rem' }}>
                    ⭐ {product.rating}
                  </span>
                </div>

                <div className="card-body d-flex flex-column p-3">
                  <h6 className="fw-bold text-dark text-truncate mb-1" title={product.name}>
                    {product.name}
                  </h6>
                  <p className="text-primary fw-bold mb-1">₹{product.price}</p>
                  <span className="badge bg-primary-subtle text-primary mb-2" style={{ width: 'fit-content', fontSize: '0.75rem' }}>
                    {product.category}
                  </span>
                  <p className="text-muted small mb-2 flex-grow-1" style={{ minHeight: '60px' }}>
                    {product.description?.length > 80
                      ? product.description.slice(0, 80) + '...'
                      : product.description}
                  </p>
                  <div className="mt-auto fw-medium text-secondary small">
                    Qty: {product.quantity || 1}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-12 text-center py-5">
            <h5 className="text-muted">No products found.</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductList;
