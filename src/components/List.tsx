import { FC } from "react";
import ListRow, { RowItem } from "./ListRow";
import './styles/list.css';

export interface Row {
    id: number | string
    items: RowItem[]
}

interface ListProps {
    rows: Row[]
    header?: RowItem[]
}

const List: FC<ListProps> = ({ rows, header }) => {
    return (
        <div className="list_wrapper">
            {header && <ListRow items={header} header={true} />}
            {rows.map(row =>
                <ListRow items={row.items} key={row.id} />)}
        </div>
    );
};

export default List;