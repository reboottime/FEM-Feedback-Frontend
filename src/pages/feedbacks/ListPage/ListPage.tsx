import React, { useState } from 'react';

import Categories from './components/Categories';
import Roadmap from './components/Roadmap';
import Sidebar from './components/Sidebar';

import { useIsMobile } from '@/hooks/mediaQueries';

import './style.scss';

export const ListPage = () => {
  const isMobile = useIsMobile();

  const [category, setCategory] = useState<TCategory>('All');

  const handleCategorySelect = (category: TCategory) => {
    setCategory(category);
  };

  return (
    <div className='list-page'>
      {isMobile && (
        <Sidebar>
          {/* The sidebar toggle is in sidebar */}
          <Roadmap />
          <Categories
            onCategorySelect={handleCategorySelect}
            selectedCategory={category}
          />
        </Sidebar>
      )}
    </div>
  );
};

export default ListPage;
