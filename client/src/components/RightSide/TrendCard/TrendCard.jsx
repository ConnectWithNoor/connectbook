import './TrendCard.css';

const TrendData = [
  {
    id: 0,
    name: 'SmackDown',
    shares: 97,
  },
  {
    id: 1,
    name: 'Avangers',
    shares: 80.5,
  },
  {
    id: 2,
    name: 'Lewandowski',
    shares: 75.5,
  },
  {
    id: 3,
    name: 'Reactjs',
    shares: 72,
  },
  {
    id: 4,
    name: 'Manchin',
    shares: 71.9,
  },
  {
    id: 5,
    name: 'Happy Mondays',
    shares: 20,
  },
];

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
