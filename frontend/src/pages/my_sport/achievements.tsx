import { getDateWithYeadString } from "../../utils/utils";

export interface IPhysicalData {
    steps: number;
    pulse: number;
    weight: number;
    fatPercents: number;
};

export enum Intencity {
    low = "низкая",
    middle = "средняя",
    height = "высокая",
};
export enum Mood {
    low = "плохое",
    middle = "среднее",
    height = "хорошее",
}

export interface IChallenge {
    goal: string; // цель на сегодня
    activity: string; // сегодняшние тренировки, виды спорта
    trainingDurationMinutes: number; // продолжительность тренировки, мс
    trainingIntencity: Intencity;
    afterTraining: string; // ощущения после тренировки
    nutrition: string; // Завтрак / Перекус / Обед / Ужин / Вода: литров
};
export interface IWellBeing {
    mood: Mood;
    reason: string; // что повлияло на самочув сегодня
}
export interface IProgress {
    succeed: boolean; // достиг цели?
    successToday: string; // успехи сегодня
    successTomorrow: string; // успехи завтра
};
export interface IMotivation {
    quoteOfTheDay: string; // цитата дня
    whySportIsImportant: string;
};
export interface IAchievementData {
    challengeData: IChallenge;
    physicalData: IPhysicalData;
    wellBeing: IWellBeing; // самочувствие
    progress: IProgress;
    motivation: IMotivation;
    date: Date;
};
const AchievementCard = (props: {data: IAchievementData}) => {
    const {data} = props;
    return <div className="avievement-card">
        <div className="avievement-card-date-header">
            <h2>{getDateWithYeadString(data.date)}</h2>
        </div>
        <div className="avievement-card-block">
            <p><b> Цель на сегодня:</b> {data.challengeData.goal}</p>
            <p><b>Сегодняшние тренировки, виды спорта:</b> {data.challengeData.activity}</p>
            <p><b>Продолжительность тренировки (мин):</b> {data.challengeData.trainingDurationMinutes}</p>
            <p><b>Интенсивность тренировки:</b> {data.challengeData.trainingIntencity}</p>
            <p><b>Ощущения после тренировки:</b> {data.challengeData.afterTraining}</p>
            <p><b>Питание, вода:</b> {data.challengeData.nutrition}</p>
        </div>
        <div className="avievement-card-block">
            <p><b>Пульс:</b> {data.physicalData.pulse}</p>
            <p><b>Пройдено шагов:</b> {data.physicalData.steps}</p>
            <p><b> Вес:</b> {data.physicalData.weight}</p>
            <p><b>% жира:</b> {data.physicalData.fatPercents}</p>
        </div>
        <div className="avievement-card-block">
            <p><b>Самочувствие:</b> {data.wellBeing.mood}</p>
            <p><b>Что повлияло на самочувствие сегодня:</b> {data.wellBeing.reason}</p>
        </div>
        <div className="avievement-card-block">
            <p><b>Цель достигнута?:</b> {data.progress.succeed ? "Да" : "Нет"}</p>
            <p><b>Успехи сегодня:</b> {data.progress.successToday}</p>
            <p><b>План на завтра:</b> {data.progress.successTomorrow}</p>
        </div>
        <div className="avievement-card-block">
            <p><b>Цитата дня:</b> {data.motivation.quoteOfTheDay}</p>
            <p><b>Почему спорт важен:</b> {data.motivation.whySportIsImportant}</p>
        </div>
    </div>
};
const AchievementsPage = (props: {data: Array<IAchievementData>}) => {
    const {data} = props;
    return <>


    {
        data.map(x => <AchievementCard data={x}/>)
    }
    </>
}

export {AchievementsPage, AchievementCard}
