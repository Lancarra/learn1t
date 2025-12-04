
export const AdminPanelStatistics = ({title, statistics, icon}) => {
    return <>
        <div>
            <p>{title}</p>
            {icon}
            <p>{statistics}</p>
            <p></p>

        </div>
    </>
}