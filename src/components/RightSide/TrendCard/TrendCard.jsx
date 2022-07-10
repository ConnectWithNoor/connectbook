import { TrendData } from '../../../Data/TrendsData';

import './TrendCard.css';

const TrendCard = () => {
  return (
    <div className='trendCard'>
      <h3>Trends for you</h3>

      {TrendData.map((trend) => {
        return (
          <div className='trend' key={trend.id}>
            <span>#{trend.name}</span>
            <span>{trend.shares}K shares</span>
          </div>
        );
      })}
    </div>
  );
};

export default TrendCard;
