import classNames from 'classnames';
import React from 'react';

import Tag from '@/components/Tag';

import { category as categories } from '@/constants/feedbacks';

import './style.scss';

export const Categories: React.FC<Props> = ({
  className,
  onCategorySelect,
  selectedCategory,
}) => {
  return (
    <nav className={classNames(
      'category border-rounded--large',
      className
    )}
    >
      {['All', ...categories].map((category) => (
        <Tag
          active={category === selectedCategory}
          clickable
          key={category}
          onClick={onCategorySelect.bind(null, category as TCategory)}
        >
          {category}
        </Tag>
      ))}
    </nav>
  );
};

interface Props {
  className?: string;
  onCategorySelect: (category: TCategory) => void;
  selectedCategory: TCategory;
}
