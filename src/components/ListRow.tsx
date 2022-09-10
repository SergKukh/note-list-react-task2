import { FC, ReactNode } from "react";
import useMediaQuery from "../hooks/useMediaQuery";

export interface RowItem {
    content: string | number | ReactNode
    width: number
}

interface ListRowProps {
    items: RowItem[]
    header?: boolean
}

const ListRow: FC<ListRowProps> = ({ items, header = false }) => {
    const matches600px = useMediaQuery('(max-width: 600px)')

    return (
        <div className={`row ${header ? 'header' : ''}`}>
            {items.map((item, index) =>
                <div
                    className="col"
                    style={{ 'width': `${matches600px ? 100 : item.width}%` }}
                    key={index}
                >
                    {item.content}
                </div>)
            }
        </div >
    );
};

export default ListRow;