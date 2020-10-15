import React from 'react';
import styled from 'styled-components';

const pageLink = styled.a`
    text-decoration: none;
    color: white;
    font-weight: bold;
    padding: 16px 32px;
`;

const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }



  return (
    <div id="nav-bar">
        <nav aria-label="Page navigation example">
        <ul className='pagination'>
            {pageNumbers.map(number => (
            <li key={number} className='page-item'>
                <pageLink onClick={() => paginate(number)}  className='page-link'>
                {number}
                </pageLink>
            </li>
            ))}
        </ul>
        </nav>
    </div>
  );
};

export default Pagination;
