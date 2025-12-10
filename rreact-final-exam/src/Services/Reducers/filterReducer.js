const initialState = {
  allProducts: [], 
  filteredProducts: [], 
  filters: {
    search: '',
    category: '',
    priceRange: [0, Infinity],
  },
};

const applyFilters = (products, filters) => {
  return products.filter((product) => {
    const matchName = product.name.toLowerCase().includes(filters.search.toLowerCase());
    const matchCategory = filters.category ? product.category === filters.category : true;
    const matchPrice = product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    return matchName && matchCategory && matchPrice;
  });
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ALL_PRODUCTS':
      return {
        ...state,
        allProducts: action.payload,
        filteredProducts: applyFilters(action.payload, state.filters),
      };

    case 'SEARCH_BY_NAME': {
      const filters = { ...state.filters, search: action.payload };
      return {
        ...state,
        filters,
        filteredProducts: applyFilters(state.allProducts, filters),
      };
    }

    case 'FILTER_BY_CATEGORY': {
      const filters = { ...state.filters, category: action.payload };
      return {
        ...state,
        filters,
        filteredProducts: applyFilters(state.allProducts, filters),
      };
    }

    case 'SET_PRICE_RANGE': {
      const filters = { ...state.filters, priceRange: action.payload };
      return {
        ...state,
        filters,
        filteredProducts: applyFilters(state.allProducts, filters),
      };
    }

    default:
      return state;
  }
};

export default filterReducer;
