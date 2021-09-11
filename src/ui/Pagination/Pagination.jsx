import c from './Pagination.module.css'
import React from 'react'
function Pagination(props) {
    console.log(props)
    let pagination = [props.currentPage - 2,
    props.currentPage - 1,
    props.currentPage,
    props.currentPage + 1,
    props.currentPage + 2,];

    return <div className={c.pagination_wrapper}>
        {
            props.currentPage === 1 ?
            <>
                <div title='to first page'>{'|<'}</div>
                <div title='to previous page'>{'<'}</div>
            </>
            :<>
                <div title='to first page'
                    onClick={() => props.selectPage(1)}
                    className={c.clickable}>{'|<'}</div>
                <div title='to previous page'
                    onClick={() => props.selectPage(props.currentPage - 1)}
                    className={c.clickable}>{'<'}</div>
            </>
        }

        {pagination ?
            pagination.map(n => {
                if (n > 0 && (n <= props.totalPages || props.totalPages === undefined)) {
                    return (n !== props.currentPage ?
                        <div key={n}
                            className={c.clickable}
                            onClick={() => props.selectPage(n)}
                        >
                            {n}
                        </div>
                        :
                        <div key={n} className={c.current}>{n}</div>)
                }
                return <div key={n} />
            })
            : null
        }
        {props.currentPage === props.totalPages ?
            <>
                <div title='to next page'>{'>'}</div>
                <div title='to last page'>{'>|'}</div>
            </>
            :
            <>
                <div title='to next page'
                    onClick={() => props.selectPage(props.currentPage + 1)}
                    className={c.clickable}>{'>'}</div>
                <div title='to last page'
                    onClick={() => props.selectPage(props.totalPages)}
                    className={c.clickable}>{'>|'}</div>
            </>
        }
    </div>
}
export default Pagination