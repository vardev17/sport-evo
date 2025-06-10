import { LineChart } from '@mui/x-charts/LineChart';
import {Select, MenuItem, SelectChangeEvent} from "@mui/material";
import Typography from '@mui/material/Typography';
import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { useState, useMemo, ChangeEvent } from 'react';
import {getTimeString, getDateString, getMonthString, oneDayTS, toDayOnly, getDateWithYeadString} from "../../utils/utils"
export interface IChartValues {
    xAxis: Array<string | Date>;
    yAxis: Array<number>;
}
export interface IChartValuesInputData {
    title: string;
    xAxis: Array<Date>;
    yAxis: Array<number>;
}
export interface IPoint<T> {
    xValue: T;
    yValue: number;
}
const timeMapper = {
    0: "День", // отображение по часам
    1: "Неделя", // отображение по дням (берём среднее за день)
    2: "Месяц", // тоже по дням
};

// Пульс (ЧСС) уд/мин
// Вес тела (кг. Фунты)
function prepareData(timeValue: number, data: IChartValuesInputData){
    const today = toDayOnly(new Date());

    const result: IChartValues = {
        xAxis: [],
        yAxis: [],
    };
    if (timeValue === 0) {
        result.xAxis = data.xAxis.filter((x) => x >= today); //.map(x => getTimeString(x));
        result.yAxis = data.yAxis.slice(-1 * result.xAxis.length);
        // console.log(data.title,"timeValue === 0", today, timeValue, result.xAxis, result.yAxis);
    }
    else {
        const startDate = new Date(today.getTime() - (timeValue === 1 ? 7 : 30) * oneDayTS);
        const filteredDates = data.xAxis.filter((x) => x >= startDate); // .map((x) => getTimeString(x));
        const filteredValues = data.yAxis.slice(-1 * filteredDates.length);
        const points: Array<IPoint<Date>> = filteredDates.map((item, i) => {
            const res: IPoint<Date> = {
                xValue: item,
                yValue: filteredValues[i],
            }
            return res;
        });
        
        // console.log(data.title, "timeValue !== 0", timeValue, startDate, filteredDates.length, data.xAxis.length, filteredValues);
        const grouped = Map.groupBy(points, (item) => getDateWithYeadString(item.xValue));
        const sortedKeys = Array.from(grouped.keys()).sort((x) => grouped.get(x)![0].xValue.getTime());
        console.log(data.title, startDate, points.length, sortedKeys.length, sortedKeys);
        // ! - assert is not null/undefined
        result.yAxis = sortedKeys.map(
            x => grouped.get(x)!.reduce(
                (sum,val) => sum + val.yValue, 0
            ) / grouped.get(x)!.length
        )
        result.xAxis = sortedKeys.map(x => grouped.get(x)![0].xValue); // getDateString()
    }
    console.log(data.title, result);
    return result;
}

const DailyChart = (props: {data: IChartValuesInputData, defaultTimeValue: number}) =>{
    const {data, defaultTimeValue} = props;
    const [timeValue, setTimevalue] = useState<number>(defaultTimeValue);
    const preparedData: IChartValues = useMemo(() => prepareData(timeValue, data), [timeValue, data]);
    // style={{width: "100%"}}
    const onChange = (event: SelectChangeEvent<number | string>) => {
        const val = event.target.value 
        if(typeof val === "string")
            setTimevalue(parseInt(val));
        else
            setTimevalue(val);
    }
    return <div style={{marginTop: "20px"}}>
        <Typography variant='h4'>{data.title}</Typography>
        <Select
          label="Период"
          value={timeValue}
          onChange={onChange}
        >
            {Object.entries(timeMapper).map(([key, val]) =><MenuItem value={key}>{val}</MenuItem>)}
        </Select>
        <LineChart
            title={data.title}
            xAxis={[{ 
                data: preparedData.xAxis, 
                scaleType: 'time',
                // valueFormatter:getTimeString
            }]} 
            series={[
                {
                    data: preparedData.yAxis,
                    area: true,
                },
            ]}
            height={300}
        />
    </div>
    
    

}

DailyChart.defaultProps = {
    defaultTimeValue: 0,
}


const ActivityPage = (props: {pulseData: IChartValuesInputData, weightData: IChartValuesInputData, stepsData: IChartValuesInputData}) => {
    const {pulseData, weightData, stepsData} = props;
    return <>
        <DailyChart data={pulseData} defaultTimeValue={0}/>
        <DailyChart data={weightData} defaultTimeValue={1}/>
        <DailyChart data={stepsData} defaultTimeValue={1}/>
    </>
}

export {ActivityPage}
