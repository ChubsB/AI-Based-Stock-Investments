import React, { useState } from 'react';

function SearchBox({ companyList, setCurrentStock }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const filteredCompanies = companyList.filter(company =>
    company.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCompanyClick = (company) => {
    setCurrentStock(company.symbol);
	setSearchTerm('');
    setDropdownVisible(false);
  }

  return (
    <div className={`group flex flex-col bg-secondayBackground hover:bg-primary pb-8 pt-6 rounded shadow-md transition-all ease-in duration-300 relative`}>
      <div className='text-primary font-inter text-base font-light text-left ml-6 group-hover:text-secondary'>Search</div>
      <div className="relative">
        <input 
          type="text" 
          className='text-primary font-inter font-bold text-left ml-6 mt-2 text-2xl group-hover:text-primary bg-secondary w-4/5 rounded text-center' 
          value={searchTerm} 
          onChange={e => {
            setSearchTerm(e.target.value)
            setDropdownVisible(true);
          }} 
        />
        {isDropdownVisible && (
          <ul className='border border-gray-300 bg-white absolute mt-2 w-full max-h-60 overflow-y-auto'>
            {filteredCompanies.map((company, index) => (
              <li 
                key={index} 
                onClick={() => handleCompanyClick(company)}
                className='p-2 hover:bg-gray-200 cursor-pointer'
              >
                {company.symbol}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SearchBox;
