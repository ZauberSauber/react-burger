import { useGetIngredientsQuery } from '@/services/constructor/api';
import { Preloader, Tab } from '@krgaa/react-developer-burger-ui-components';
import clsx from 'clsx';
import { useRef, useState } from 'react';

import { IngredientTypeBlock } from '../ingredient-type-block/ingredient-type-block';
import { TABS } from './constants';

import styles from './burger-ingredients.module.css';

export const BurgerIngredients = (): React.JSX.Element => {
  const { isLoading, data } = useGetIngredientsQuery('');
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const isActive = (index: number): boolean => index === activeIndex;

  const listContainerRef = useRef<HTMLDivElement>(null);
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const addToRefs = (el: HTMLDivElement | null, index: number): void => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current[index] = el;
    }
  };

  const handleScroll = (): void => {
    if (!listContainerRef.current) return;

    const containerRect = listContainerRef.current.getBoundingClientRect();

    sectionRefs.current.forEach((section, index) => {
      if (!section) return;

      const sectionRect = section.getBoundingClientRect();
      const relativeTop = sectionRect.top - containerRect.top;

      if (relativeTop >= -50 && relativeTop < 150) {
        if (activeIndex !== index) {
          setActiveIndex(index);
        }
      }
    });
  };

  const handleSwitchClick = (index: number): void => {
    setActiveIndex(index);
    const targetRef = sectionRefs.current[index];

    if (targetRef && listContainerRef.current) {
      targetRef.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  return (
    <section className={clsx(styles.burger_ingredients, 'pb-10')}>
      <nav>
        <ul className={styles.menu}>
          {TABS.map((tab, index) => (
            <Tab
              key={tab.id}
              value={tab.id}
              active={isActive(index)}
              onClick={() => handleSwitchClick(index)}
            >
              {tab.name}
            </Tab>
          ))}
        </ul>
      </nav>
      {isLoading ? (
        <Preloader />
      ) : (
        <section
          className={clsx('custom-scroll', styles.ingredients_container)}
          ref={listContainerRef}
          onScroll={handleScroll}
        >
          {TABS.map((tab, index) => {
            return (
              <IngredientTypeBlock
                key={tab.id}
                ref={(el: HTMLDivElement) => addToRefs(el, index)}
                type={tab.id}
                ingredients={(data?.data ?? []).filter(
                  (ingredient) => ingredient.type === tab.id
                )}
              />
            );
          })}
        </section>
      )}
    </section>
  );
};
