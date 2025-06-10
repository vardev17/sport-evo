import { useState, useMemo, ChangeEvent } from 'react';
import {Select, MenuItem, SelectChangeEvent} from "@mui/material";
import { getDateWithYeadString, toDayOnly, oneDayTS } from "../../utils/utils";

export interface INotification {
    text: string;
    type: string;
    crew: string;
    date: Date;
}

const NotificationItem = (props: {data: INotification}) => {
    const {data} = props;
    return <div className="avievement-card">
        <div className="avievement-card-date-header">
            <h2>{getDateWithYeadString(data.date)}</h2>
        </div>
        <div className="avievement-card-block">
            <p><b>{data.crew}: {data.type}</b></p>
            <br></br>
            <p>{data.text}</p>
        </div>
    </div>
}

enum DatesT{
    today = 0,
    yesterday=1,
    thisWeek=2,
    all=3
}
const datesNameMapper: Record<number, string> = {
    0: "Сегодня",
    1: "Вчера",
    2: "На этой неделе",
    3: "За всё время",
};

// const switchCountDays = (dateValue: DatesT) => {
//     if (dateValue == DatesT.today)
//         return 0;
//     if (dateValue == DatesT.yesterday)
//         return 1;

// }

const filterFunc = (data: Array<INotification>, typeValue: string, crewValue: string, dateValue: DatesT) => {
    const today = toDayOnly(new Date());
    const yesterday = new Date(today.getTime() - oneDayTS);
    const week = new Date(today.getTime() - 7 * oneDayTS);
    let result = [...data];
    if (typeValue.length)
        result = result.filter(x => x.type === typeValue);
    if (crewValue.length)
        result = result.filter(x => x.crew === crewValue);
    if (dateValue === DatesT.today)
        result = result.filter(x => x.date.getTime() > today.getTime());
    if (dateValue === DatesT.yesterday)
        result = result.filter(x => x.date.getTime() < today.getTime() && x.date.getTime() > yesterday.getTime());
    if (dateValue === DatesT.thisWeek)
        result = result.filter(x => x.date.getTime() > week.getTime());
    return result;
}

const NotificationsPage = (props: {data: Array<INotification>}) => {
    const {data} = props;
    const [dateValue, setDateValue] = useState<DatesT>(DatesT.all);
    const [typeValue, setTypeValue] = useState<string>("");
    const [crewValue, setCrewValue] = useState<string>("");
    const preparedData: Array<INotification> = useMemo(() => filterFunc(data, typeValue, crewValue, dateValue), [data, typeValue, crewValue, dateValue]);
    const onDateChange = (ev: SelectChangeEvent<DatesT | string>) => {
        const val = ev.target.value 
        if(typeof val === "string")
            setDateValue(parseInt(val));
        else
        setDateValue(val);   
    };
    const onTypeChange = (ev: SelectChangeEvent<string>) => {
        setTypeValue(ev.target.value);
    };
    const onCrewChange = (ev: SelectChangeEvent<string>) => {
        setCrewValue(ev.target.value);
    };
    const allTypes: Array<string> = useMemo(() => Array.from(new Set(data.map(x => x.type))), [data]);
    const allCrews: Array<string> = useMemo(() => Array.from(new Set(data.map(x => x.crew))), [data]);
    
    return <div>
        <div className='notif-buttons'>
            <Select
                label="Время"
                value={dateValue}
                onChange={onDateChange}
                // displayEmpty={true}
            >
                {Object.keys(DatesT).filter(x => Object.prototype.hasOwnProperty.call(datesNameMapper, x)).map(x => <MenuItem key={x} value={x}>{datesNameMapper![parseInt(x)]}</MenuItem>)}
            </Select>
            <Select
                label="Тип"
                value={typeValue}
                onChange={onTypeChange}
            >
                {allTypes.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
                <MenuItem key={""} value={""}>Убрать фильтр</MenuItem>
            </Select>
            <Select
                label="Команда/Класс"
                value={crewValue}
                onChange={onCrewChange}
            >
                {allCrews.map(x => <MenuItem key={x} value={x}>{x}</MenuItem>)}
                <MenuItem key={""} value={""}>Убрать фильтр</MenuItem>
            </Select>
        </div>
        {preparedData.map(x => <NotificationItem data={x}/>)}
    </div>
}

export {NotificationsPage}