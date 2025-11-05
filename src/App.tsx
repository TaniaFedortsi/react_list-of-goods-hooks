import { useState, FC } from 'react';
import cn from 'classnames';
import 'bulma/css/bulma.css';
import './App.scss';

type Good = string;

type SortType = 'alphabet' | 'length';

type SortGoods = (type: SortType) => void;

export const goodsFromServer: Good[] = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App: FC = () => {
  const [sortedGoods, setSortedGoods] = useState<Good[]>(goodsFromServer);
  const [isReversed, setIsReversed] = useState<boolean>(false);
  const [sortType, setSortType] = useState<SortType | null>(null);
  const isModified: boolean =
    JSON.stringify(sortedGoods) !== JSON.stringify(goodsFromServer);

  const sortGoods: SortGoods = (type) => {
    const goods = [...goodsFromServer];

    if (type === 'alphabet') {
      goods.sort((a, b) => a.localeCompare(b));
    } else if (type === 'length') {
      goods.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      goods.reverse();
    }

    setSortedGoods(goods);
    setSortType(type);
  };

  const reverseGoods = (): void => {
    setSortedGoods(prev => [...prev].reverse());
    setIsReversed(prev => !prev);
  };

  const reset = (): void => {
    setSortedGoods(goodsFromServer);
    setSortType(null);
    setIsReversed(false);
  };

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={cn('button is-info', {
            'is-light': sortType !== 'alphabet',
          })}
          onClick={() => sortGoods('alphabet')}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={cn('button is-success', {
            'is-light': sortType !== 'length',
          })}
          onClick={() => sortGoods('length')}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={cn('button is-warning', { 'is-light': !isReversed })}
          onClick={reverseGoods}
        >
          Reverse
        </button>

        {isModified && (
          <button type="button" className="button is-danger" onClick={reset}>
            Reset
          </button>
        )}
      </div>

      <ul>
        {sortedGoods.map(good => (
          <li key={good} data-cy="Good">
            {good}
          </li>
        ))}
      </ul>
    </div>
  );
};
