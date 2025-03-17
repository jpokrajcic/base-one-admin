/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'reactstrap';
import SimpleSelectInputField from '../../common/formElements/selectInputField/SimpleSelectInputField';

export const RESULTS_PER_PAGE = [
  [1, 25],
  [2, 50],
  [3, 100],
];

function Pagination(props) {
  const { paginationData, onPageChange, onResultsPerPageChange } = props;
  const { total, numberOfPages, pageSize, currentPage } = paginationData;

  const [allPages, setAllPages] = useState([]);
  const [currentPages, setCurrentPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState();

  const [showPrevious, setShowPrevious] = useState(false);
  const [showNext, setShowNext] = useState(false);

  useEffect(() => {
    setCurrentPageIndex(currentPage - 1);

    if (allPages.length > 5) {
      if (currentPage > 1) setShowPrevious(true);
      if (currentPage < allPages.length) {
        setShowNext(true);
      } else {
        setShowNext(false);
      }

      if (currentPage < 3) {
        setCurrentPages(allPages.slice(0, 5));
      } else if (currentPage >= allPages.length - 2) {
        setCurrentPages(allPages.slice(allPages.length - 5, allPages.length));
      } else if (currentPage > 3 && allPages.length > currentPage + 2) {
        setCurrentPages(allPages.slice(currentPage - 3, currentPage + 2));
      }
    } else {
      setShowPrevious(false);
      setShowNext(false);
    }
  }, [allPages, currentPage]);

  useEffect(() => {
    if (numberOfPages > 1) {
      const pagesArray = [];
      for (let index = 0; index < numberOfPages; index++) {
        pagesArray.push(index + 1);
      }
      setAllPages([...pagesArray]);
      setCurrentPageIndex(0);
      setCurrentPages(pagesArray.slice(0, 6));

      setShowPrevious(false);
      if (numberOfPages > 5) {
        setShowNext(true);
      } else {
        setShowNext(false);
      }
    } else {
      setAllPages([]);
      setCurrentPageIndex(0);
      setCurrentPages([]);

      setShowPrevious(false);
      setShowNext(false);
    }
  }, [numberOfPages]);

  function nextClickHandler() {
    setCurrentPageIndex(currentPageIndex + 1);
    setShowPrevious(true);

    if (currentPageIndex === allPages.length - 2) setShowNext(false);

    if (currentPageIndex >= 2 && currentPageIndex <= allPages.length - 4)
      setCurrentPages(allPages.slice(currentPageIndex - 1, currentPageIndex + 4));

    onPageChange(currentPageIndex + 2);
  }

  function previousClickHandler() {
    setCurrentPageIndex(currentPageIndex - 1);
    setShowNext(true);

    if (currentPageIndex - 1 === 0) setShowPrevious(false);

    if (currentPageIndex > 2 && currentPageIndex <= allPages.length - 3)
      setCurrentPages(allPages.slice(currentPageIndex - 3, currentPageIndex + 2));

    onPageChange(currentPageIndex);
  }

  function pageClickHandler(page) {
    setCurrentPageIndex(page - 1);

    if (allPages.length > 5) {
      if (page > 1) setShowPrevious(true);
      if (page < allPages.length) {
        setShowNext(true);
      } else {
        setShowNext(false);
      }

      if (page < 3) {
        setCurrentPages(allPages.slice(0, 5));
      } else if (page >= allPages.length - 2) {
        setCurrentPages(allPages.slice(allPages.length - 5, allPages.length));
      } else if (page > 3 && allPages.length > page + 2) {
        setCurrentPages(allPages.slice(page - 3, page + 2));
      }
    } else {
      setShowPrevious(false);
      setShowNext(false);
    }

    onPageChange(page);
  }

  return (
    <nav aria-label='...'>
      <Row>
        <Col className='col-3 col-sm-2'>
          <SimpleSelectInputField
            input={{
              value: pageSize[0],
              onChange: (event) => onResultsPerPageChange(event.target.value),
            }}
            choices={RESULTS_PER_PAGE}
            firstOptionEmpty={false}
            baseFieldClass=''
            fieldClass='c-field--label-hidden'
            selectClass='o-select--inline'
          />
          <div className='c-nav-page__total'>{`${total} results `}</div>
        </Col>
        <Col className='col-9 col-sm-10'>
          <ul className='pagination my-4 pagination-alt'>
            {showPrevious && (
              <li className='page-item'>
                <a className='page-link' onClick={previousClickHandler}>
                  <i class='fas fa-angle-left'>
                    <span class='sr-only'>Previous</span>
                  </i>
                </a>
              </li>
            )}
            {currentPages.map((page) => (
              <li key={page} className={`page-item ${page === currentPageIndex + 1 ? 'active' : ''}`}>
                <a className='page-link' href='#' onClick={() => pageClickHandler(page)}>
                  {page}
                </a>
              </li>
            ))}
            {showNext && (
              <li className='page-item'>
                <a className='page-link' href='#' onClick={nextClickHandler}>
                  <i class='fas fa-angle-right'>
                    <span class='sr-only'>Next</span>
                  </i>
                </a>
              </li>
            )}
          </ul>
        </Col>
      </Row>
    </nav>
  );
}

Pagination.propTypes = {
  numberOfPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;

// /* eslint-disable jsx-a11y/anchor-is-valid */
// import React, { useEffect, useState } from 'react';
// import PropTypes from 'prop-types';
// import SvgIcon from '../svgIcon/SvgIcon';

// function Pagination(props) {
//   const { numberOfPages, onPageChange, currentPage } = props;

//   const [allPages, setAllPages] = useState([]);
//   const [currentPages, setCurrentPages] = useState([]);
//   const [currentPageIndex, setCurrentPageIndex] = useState();

//   const [showPrevious, setShowPrevious] = useState(false);
//   const [showNext, setShowNext] = useState(false);

//   useEffect(() => {
//     setCurrentPageIndex(currentPage - 1);

//     if (allPages.length > 5) {
//       if (currentPage > 1) setShowPrevious(true);
//       if (currentPage < allPages.length) {
//         setShowNext(true);
//       } else {
//         setShowNext(false);
//       }

//       if (currentPage < 3) {
//         setCurrentPages(allPages.slice(0, 5));
//       } else if (currentPage >= allPages.length - 2) {
//         setCurrentPages(allPages.slice(allPages.length - 5, allPages.length));
//       } else if (currentPage > 3 && allPages.length > currentPage + 2) {
//         setCurrentPages(allPages.slice(currentPage - 3, currentPage + 2));
//       }
//     } else {
//       setShowPrevious(false);
//       setShowNext(false);
//     }
//   }, [allPages, currentPage]);

//   useEffect(() => {
//     if (numberOfPages > 1) {
//       const pagesArray = [];
//       for (let index = 0; index < numberOfPages; index++) {
//         pagesArray.push(index + 1);
//       }
//       setAllPages([...pagesArray]);
//       setCurrentPageIndex(0);
//       setCurrentPages(pagesArray.slice(0, 6));

//       setShowPrevious(false);
//       if (numberOfPages > 5) {
//         setShowNext(true);
//       } else {
//         setShowNext(false);
//       }
//     } else {
//       setAllPages([]);
//       setCurrentPageIndex(0);
//       setCurrentPages([]);

//       setShowPrevious(false);
//       setShowNext(false);
//     }
//   }, [numberOfPages]);

//   function nextClickHandler() {
//     setCurrentPageIndex(currentPageIndex + 1);
//     setShowPrevious(true);

//     if (currentPageIndex === allPages.length - 2) setShowNext(false);

//     if (currentPageIndex >= 2 && currentPageIndex <= allPages.length - 4)
//       setCurrentPages(allPages.slice(currentPageIndex - 1, currentPageIndex + 4));

//     onPageChange(currentPageIndex + 2);
//   }

//   function previousClickHandler() {
//     setCurrentPageIndex(currentPageIndex - 1);
//     setShowNext(true);

//     if (currentPageIndex - 1 === 0) setShowPrevious(false);

//     if (currentPageIndex > 2 && currentPageIndex <= allPages.length - 3)
//       setCurrentPages(allPages.slice(currentPageIndex - 3, currentPageIndex + 2));

//     onPageChange(currentPageIndex);
//   }

//   function pageClickHandler(page) {
//     setCurrentPageIndex(page - 1);

//     if (allPages.length > 5) {
//       if (page > 1) setShowPrevious(true);
//       if (page < allPages.length) {
//         setShowNext(true);
//       } else {
//         setShowNext(false);
//       }

//       if (page < 3) {
//         setCurrentPages(allPages.slice(0, 5));
//       } else if (page >= allPages.length - 2) {
//         setCurrentPages(allPages.slice(allPages.length - 5, allPages.length));
//       } else if (page > 3 && allPages.length > page + 2) {
//         setCurrentPages(allPages.slice(page - 3, page + 2));
//       }
//     } else {
//       setShowPrevious(false);
//       setShowNext(false);
//     }

//     onPageChange(page);
//   }

//   return (
//     <ul className='c-nav-page__items'>
//       {showPrevious && (
//         <li className='c-nav-page__item c-nav-page__item--prev'>
//           <a className='c-nav-page__link' onClick={previousClickHandler}>
//             <SvgIcon icon='angle-left' />
//             Previous
//           </a>
//         </li>
//       )}
//       {currentPages.map((page) => (
//         <li
//           key={page}
//           className={`c-nav-page__item ${page === currentPageIndex + 1 ? 'c-nav-page__item--active' : ''}`}
//         >
//           {page === currentPageIndex + 1 ? (
//             page
//           ) : (
//             <a className='c-nav-page__link' href='#' onClick={() => pageClickHandler(page)}>
//               {page}
//             </a>
//           )}
//         </li>
//       ))}
//       {showNext && (
//         <li className='c-nav-page__item c-nav-page__item--next'>
//           <a className='c-nav-page__link' href='#' onClick={nextClickHandler}>
//             Next
//             <SvgIcon icon='angle-right' />
//           </a>
//         </li>
//       )}
//     </ul>
//   );
// }

// Pagination.propTypes = {
//   numberOfPages: PropTypes.number.isRequired,
//   onPageChange: PropTypes.func.isRequired,
//   currentPage: PropTypes.number.isRequired,
// };

// export default Pagination;
