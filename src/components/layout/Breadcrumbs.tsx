import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export interface BreadcrumbItem {
  name: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items }) => {
  return (
    <nav
      aria-label="Breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
      className="py-3 px-4 sm:px-6 lg:px-8 bg-slate-100/70 border-b border-slate-200/80"
    >
      <ol className="max-w-7xl mx-auto flex items-center space-x-2 text-xs text-slate-500 overflow-x-auto whitespace-nowrap scrollbar-none py-0.5 list-none p-0 m-0">
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
          className="flex items-center"
        >
          <Link
            to="/"
            itemProp="item"
            className="flex items-center hover:text-navy-900 transition-colors py-0.5"
            aria-label="Home"
          >
            <Home className="w-3.5 h-3.5 mr-1" />
            <span itemProp="name">Home</span>
          </Link>
          <meta itemProp="position" content="1" />
        </li>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          const position = idx + 2;

          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
              <li
                itemProp="itemListElement"
                itemScope
                itemType="https://schema.org/ListItem"
                className="flex items-center"
              >
                {isLast || !item.path ? (
                  <span
                    itemProp="name"
                    className="font-semibold text-navy-900 truncate"
                    aria-current="page"
                  >
                    {item.name}
                  </span>
                ) : (
                  <Link
                    to={item.path}
                    itemProp="item"
                    className="hover:text-navy-900 transition-colors py-0.5"
                  >
                    <span itemProp="name">{item.name}</span>
                  </Link>
                )}
                <meta itemProp="position" content={String(position)} />
              </li>
            </React.Fragment>
          );
        })}
      </ol>
    </nav>
  );
};
