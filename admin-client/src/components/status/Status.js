import StatusEnum from '../../shared/enums';
import style from './status.module.css';
const Status = ({ type }) => {
    let css;
    if (type == StatusEnum.Active)
        css = { 'backgroundColor': '#D3F8E2', 'color': '#00ad46' }
    else if (type == StatusEnum.InActive)
        css = { 'backgroundColor': '#A9DEF9', 'color': '#0073ae' }
    else if (type == StatusEnum.InProgress)
        css = { 'backgroundColor': '#EDE7B1', 'color': '#b6a400' }
    else if (type == StatusEnum.Pending)
        css = { 'backgroundColor': '#E4C1F9', 'color': '#8600d6' }
    else if (type == StatusEnum.Deleted)
        css = { 'backgroundColor': '#F694C1', 'color': '#ad004f' }

    return (
        <>
            <div className="d-flex">
                <div className={style.status} style={{ ...css }}>
                    {type}
                </div>
            </div>
        </>
    );
};

export default Status;
