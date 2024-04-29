import { FC, memo } from 'react'
import { classNames } from 'shared/lib/classNames/classNames'
import cls from './Table.module.scss'

interface TableProps {
    headerData: string[]
    data: { [key: string]: any }[]
    rowHeight: number
}

const Table: FC<TableProps> = memo(({ headerData, data, rowHeight }) => {
    const getAllKeys = () => {
        const keys: string[] = []
        data?.forEach((item) => {
            Object.keys(item).forEach((key) => {
                if (!keys.includes(key)) {
                    keys.push(key)
                }
            })
        })
        return keys
    }

    const getValueByKey = (item: { [key: string]: any }, key: string) => {
        return Object.prototype.hasOwnProperty.call(item, key) ? item[key] : ''
    }

    const keys = getAllKeys()

    return (
        <div className={classNames(cls.wrapper, {}, [])}>
            <table className={cls.table_wrapper}>
                <thead className={cls.table_header}>
                    <tr className={cls.table_row}>
                        {headerData?.map((header) => (
                            <th
                                className={classNames(cls.table_cell, {}, [
                                    header === 'name' ? cls.name : '',
                                ])}
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody className={cls.table_body}>
                    {data?.map((item, index) => (
                        <tr
                            className={classNames(cls.table_row, {}, [
                                index % 2 !== 0 ? cls.even : '',
                            ])}
                            style={{ height: `${rowHeight}px` }}
                        >
                            {keys.map((key, subIndex) => (
                                <td
                                    className={classNames(cls.table_cell, {}, [
                                        key === 'name' ? cls.name : '',
                                        subIndex === 0
                                            ? cls.first_left_cell
                                            : '',
                                        subIndex === keys.length - 1
                                            ? cls.last_right_cell
                                            : '',
                                    ])}
                                >
                                    {getValueByKey(item, key)}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
})

export default Table
