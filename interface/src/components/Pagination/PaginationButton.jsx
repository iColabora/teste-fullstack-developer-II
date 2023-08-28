export default function PaginationButton(props = null) {
    let className = "pagination-button";
    if(props.selected){
        className += " selected";
    }

    function pageClick(newPage){
        props.action(newPage);
    } 

    return (
        <div className={className} id={props.page} onClick={() => { pageClick(props.page)}}>{props.label}</div>
    );
}