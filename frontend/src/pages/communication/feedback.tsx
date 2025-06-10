import { useState, useMemo, ChangeEvent, MouseEvent } from 'react';
import {TextField, Button, Select, MenuItem, SelectChangeEvent, TextareaAutosize } from "@mui/material";
import { getDateWithYeadString, toDayOnly, oneDayTS } from "../../utils/utils";
// import { TextareaAutosize } from '@mui/base/TextareaAutosize';
// import TextareaAutosize from '@mui/material';
import Alert from '@mui/material/Alert';




const tMapper = {
    0: "Ошибка в приложении", 
    1: "Предложение по улучшению", 
    2: "Вопрос по расписанию", 
    3: "Жалоба на пользователя", 
    4: "Другое"
};

const FeedbackPage = () => {
    const [isVisible, setIsVisible] = useState<boolean>(false);
    const [tValue, setTValue] = useState<number>(0);
    const [textValue, setTextValue] = useState<string>("");
    const onClick = (ev: MouseEvent) => {
        ev.stopPropagation();
        ev.preventDefault();
        // alert("Ваше сообщение отправлено администратору");
        setTextValue("");
        setIsVisible(true);
        setTimeout(() => setIsVisible(false), 2000)
    }
    const onTValueChange = (ev: SelectChangeEvent<string | number>) => {
        const val = ev.target.value 
        if(typeof val === "string")
            setTValue(parseInt(val));
        else
        setTValue(val);   
    };
    const onTextValueChange = (ev: ChangeEvent<HTMLTextAreaElement>) => {
        setTextValue(ev.target.value);
    };
    return <>
        { 
            isVisible ?
            <Alert style={{margin: "10px 10px 10px 10px"}} variant="filled" severity="success">
                Ваше сообщение отправлено администратору
            </Alert>
            : null
        }
        <div className="feedback-card">
            <div className='feedback-card-item'>
                <Select
                    label="Категория обращения"
                    value={tValue}
                    onChange={onTValueChange}
                >
                    {Object.entries(tMapper).map(([key, val]) =><MenuItem value={key}>{val}</MenuItem>)}
                </Select>

            </div>
            <div className='feedback-card-text feedback-card-item'>
                <TextField
                    value={textValue}
                    onChange={onTextValueChange}
                    className='feedback-text'
                    fullWidth={true}
                />
            </div>
            <div className='feedback-card-item'>
                <Button className='feedback-card-item' onClick={onClick}>Отправить</Button>

            </div>
        </div>
    </> 
}


export {FeedbackPage}