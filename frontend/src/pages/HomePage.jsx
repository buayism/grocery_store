import React, { useState, useMemo } from 'react';
import ProductCard from '../components/product/ProductCard';
import CategoryChip from '../components/product/CategoryChip';
import { CATEGORIES } from '../utils/constants';

// Mock products for demo — will be replaced by API calls
const MOCK_PRODUCTS = [
  { id: '1', name: 'Heirloom Carrots', category: 'Roots & Tubers', price: 4.50, unit: 'lb', stockLevel: 'HIGH', imageUrl: null, farmerName: 'Sunfield Farm' },
  { id: '2', name: 'Tuscan Kale', category: 'Leafy Vegetables', price: 3.25, unit: 'bunch', stockLevel: 'LOW', imageUrl: null, farmerName: 'Green Valley' },
  { id: '3', name: 'Fingerling Potatoes', category: 'Roots & Tubers', price: 5.80, unit: '2lb', stockLevel: 'HIGH', imageUrl: null, farmerName: 'Heritage Acres' },
  { id: '4', name: 'Bell Peppers', category: 'Fruits', price: 1.50, unit: 'each', stockLevel: 'HIGH', imageUrl: null, farmerName: 'Riverside Farm' },
  { id: '5', name: 'Brussels Sprouts', category: 'Others', price: 4.00, unit: 'lb', stockLevel: 'SEASONAL', imageUrl: null, farmerName: 'Valley View' },
  { id: '6', name: 'Purple Garlic', category: 'Roots & Tubers', price: 2.10, unit: 'bulb', stockLevel: 'HIGH', imageUrl: null, farmerName: 'Organic Fields' },
  { id: '7', name: 'Standard Tomato', category: 'Fruits', price: 3.00, unit: 'lb', stockLevel: 'HIGH', imageUrl: null, farmerName: 'Red Barn Farm' },
  { id: '8', name: 'Baby Spinach', category: 'Leafy Vegetables', price: 4.75, unit: 'bag', stockLevel: 'LOW', imageUrl: null, farmerName: 'Green Valley' },
  { id: '9', name: 'Red Onions', category: 'Roots & Tubers', price: 1.20, unit: 'lb', stockLevel: 'HIGH', imageUrl: null, farmerName: 'Heritage Acres' },
  { id: '10', name: 'Shiitake Mushroom', category: 'Others', price: 9.00, unit: 'lb', stockLevel: 'LIMITED', imageUrl: null, farmerName: 'Forest Grove' },
];

const categoryMap = {
  'all': null,
  'leafy-greens': 'Leafy Vegetables',
  'fruits': 'Fruits',
  'roots': 'Roots & Tubers',
  'herbs': 'Herbs',
  'vegetables': 'Vegetables',
  'others': 'Others',
};

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'all') return MOCK_PRODUCTS;
    const mapped = categoryMap[activeCategory];
    return MOCK_PRODUCTS.filter((p) => p.category === mapped);
  }, [activeCategory]);

  return (
    <div className="animate-fade-in">
      {/* Category Chips — horizontal scroll */}
      <div className="px-4 md:px-8 py-4 overflow-x-auto">
        <div className="flex gap-3 pb-1">
          {CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat.id}
              category={cat}
              isActive={activeCategory === cat.id}
              onClick={() => setActiveCategory(cat.id)}
            />
          ))}
        </div>
      </div>

      {/* Section Header */}
      <div className="px-4 md:px-8 pt-4 pb-2 flex items-end justify-between border-b border-[var(--color-border)] mb-4">
        <div>
          <p className="text-[10px] md:text-xs font-bold uppercase tracking-[0.15em] text-[var(--color-text-muted)]">
            Marketplace
          </p>
          <h2 className="text-2xl md:text-3xl font-black text-[var(--color-text-primary)] leading-tight mb-2">
            Current Harvest
          </h2>
        </div>
        <p className="text-xs font-semibold text-[var(--color-text-muted)] mb-2">
          Showing {filteredProducts.length} products
        </p>
      </div>

      {/* Product Grid */}
      <div className="px-4 md:px-8 pt-2 pb-8 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 md:gap-6 stagger-children">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Load More */}
      {filteredProducts.length >= 10 && (
        <div className="px-4 md:px-8 pb-12 flex justify-center mt-4">
          <button className="px-10 py-4 border-2 border-[var(--color-border)] text-[var(--color-text-primary)] text-sm font-bold uppercase tracking-widest rounded-xl hover:bg-[var(--color-elevated)] transition-colors cursor-pointer">
            Load More Items
          </button>
        </div>
      )}
    </div>
  );
}
