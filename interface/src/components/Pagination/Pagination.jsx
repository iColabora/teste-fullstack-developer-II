import PaginationButton from './PaginationButton';
import './pagination.css';

export default function Pagination(data){
    var records = 0;
    var limit = 1;
    var offset = 0;
    var action = "";
    var pages = 1;
    var buttons = [];
    
    if(data){
        records = data.records;
        limit = data.limit;
        offset = data.offset;
        action = data.action;
    }

    pages = Math.ceil(records / limit) || 1;

    for(let x = 0; x < pages; x++){
        buttons.push({
            label: x + 1,
            page: x+1
        });
    }
    
    return (
        <div className="pagination-container">
            
            {
                buttons.map((button, index) => (
                    <PaginationButton key={index} id={button.page} label={button.label} page={button.page} action={data.action} />
                ))
            }
        </div>
    );
}