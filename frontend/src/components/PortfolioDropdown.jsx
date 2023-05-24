import React from 'react';

function PortfolioDropdown({ portfolioList, setCurrentPortfolio }) {
  const handlePortfolioClick = (portfolioId) => {
    const selectedPortfolio = portfolioList.find(portfolio => portfolio._id === portfolioId);
    setCurrentPortfolio(selectedPortfolio);
  }

  return (
    <div className={`group flex flex-col bg-secondayBackground hover:bg-primary pb-8 pt-6 rounded shadow-md transition-all ease-in duration-300 relative`}>
      <div className='text-primary font-inter text-base font-light text-left ml-6 group-hover:text-secondary'>Select Portfolio</div>
      <div className="relative">
        <select 
          onChange={e => handlePortfolioClick(e.target.value)} 
          className='text-primary font-inter font-bold text-left ml-6 mt-2 text-2xl group-hover:text-primary bg-secondary w-5/6 rounded text-center'
        >
          {portfolioList.map((portfolio, index) => (
            <option 
              key={index} 
              value={portfolio._id}
            >
              {portfolio.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default PortfolioDropdown;
