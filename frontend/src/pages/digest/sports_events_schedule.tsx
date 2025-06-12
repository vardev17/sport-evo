import { useState, useMemo, ChangeEvent, MouseEvent } from 'react';
import {TextField, Button, Select, MenuItem, SelectChangeEvent, TextareaAutosize } from "@mui/material";
import { getDateWithYeadString, toDayOnly, oneDayTS } from "../../utils/utils";
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { PickerValue,} from '@mui/x-date-pickers/internals/models';
import { DateView } from '@mui/x-date-pickers/models';
import { PickerSelectionState } from "@mui/x-date-pickers/esm/internals/hooks/usePicker/index.js";
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';


export interface IEventItem {
    title: string; // Чемпионат Мира по футболу 2026
    description: string; // Самый масштабный футбольный турнир, проходящий в США, Канаде и Мексике
    sportType: string; // Футбол
    link: string; // sports.ru
    date: Date;
    dateEnd?: Date;
};

const prepareData = (data: Array<IEventItem>) => {
    const result: Map<string, IEventItem> = new Map();
    for (let item of data){
        result.set(getDateWithYeadString(item.date), item);
    }
    return result;
}

const SimpleDialog = (props: {data: IEventItem | null, open: boolean, setClose: () => void}) => {
    const {data, open, setClose} = props;
    if(data === null) return null;
    return <Dialog  className='event-calendar-dialog' open={open}>
        <DialogTitle>{data.dateEnd ? `${getDateWithYeadString(data.date)} - ${getDateWithYeadString(data.dateEnd)}` : `${getDateWithYeadString(data.date)}`}</DialogTitle>
        <DialogContent>
            <Typography gutterBottom>{data.title}</Typography>
            <Typography gutterBottom>{data.description}</Typography>
            <Typography gutterBottom>{data.sportType}</Typography>
            <Typography gutterBottom>{data.link}</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={setClose}>Выйти</Button>
        </DialogActions>
    </Dialog>
}

function EventDay(props: PickersDayProps & { preparedData?: Map<string, IEventItem>}) {
    const { preparedData = new Map(), day, outsideCurrentMonth, ...other } = props;
    const isSelected = preparedData.has( getDateWithYeadString(props.day.toDate()));
    return (
      <Badge
        key={props.day.toString()}
        overlap="circular"
        
        badgeContent={isSelected ? '✔' : undefined}
      >
        <PickersDay {...other} outsideCurrentMonth={outsideCurrentMonth} day={day} />
      </Badge>
    );
  }

const SportEventsSchedulePage = (
    props: {data: Array<IEventItem>}
) => {
    const {data} = props;
    const [selectedItem, setSelectedItem] = useState<IEventItem | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    
    const preparedData: Map<string, IEventItem> = useMemo(() => prepareData(data), [data]);
    // const preparedData: Map<string, IEventItem> = new Map();
    const onChange = (value: PickerValue, selectionState?: PickerSelectionState | undefined, selectedView?: DateView | undefined) => {
        if (value === null) return;
        // console.log(getDateWithYeadString(value?.toDate()));
        preparedData
        const item = preparedData.get(getDateWithYeadString(value?.toDate()));
        if (item === undefined) return;
        setSelectedItem(item);
        setOpen(true);
    };
    
    return <>
        <div className='event-calendar-container'>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateCalendar 
                    onChange={onChange}
                    slots={{
                        day: EventDay,
                      }}
                      slotProps={{
                        day: {
                          preparedData,
                        } as any,
                      }}
                />
            </LocalizationProvider>
        </div>
        <SimpleDialog data={selectedItem} setClose={() => setOpen(false)} open={open}/>
    </> 
}


export {
    SportEventsSchedulePage
}