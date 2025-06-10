export interface IItemsWithTitle {
    title: string;
    items: Array<string>;
}
export interface ITraining {
    title: string;
    items: Array<IItemsWithTitle>;
}
export interface ITrainignData {
    title: string;
    training: Array<IItemsWithTitle>
    dailyRoutine: IItemsWithTitle;
}

const TrainingPage = (props: {data: ITrainignData}) => {
    const {data} = props;
    return <div className="tr-page">
        <h2>{data.title}</h2>
        {data.training.map(item => <div className="tr-page-card" key={item.title}>
            <h3>{item.title}</h3>
            <ul>
                {item.items.map(subitem => <li key={subitem}>{subitem}</li>)}
            </ul>
        </div>
        )}
        
        <div className="tr-page-card">
            <h3>{data.dailyRoutine.title}</h3>
            <ul>
                {data.dailyRoutine.items.map((item) => <li key={item}>{item}</li>)}
            </ul>

        </div>
    </div>
}

export {TrainingPage}
