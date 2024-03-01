import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';

export interface DataItem {
    [key: string]: any;
}

interface Props {
    data: DataItem[];
}

export function Table({ data }: Props): React.ReactElement {
    const tableRef = useRef<HTMLTableElement>(null);
    let dataTable: DataTables.Api | undefined;

    useEffect(() => {
        if (tableRef.current) {
            dataTable = $(tableRef.current).DataTable({
                searching: true,
                paging: false,
                ordering: true
            });
        }

        return () => {
            // Clean up the DataTable when the component is unmounted
            if (dataTable) {
                dataTable.destroy();
            }
        };
    }, []);

    return (
        <table ref={tableRef} className="table">
            <thead>
            <tr>
                {Object.keys(data[0]).map((key) => (
                    <th key={key}>{key}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {data.map((item) => (
                <tr key={item.id}>
                    {Object.values(item).map((value, idx) => (
                        <td key={idx}>{value}</td>
                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    );
}