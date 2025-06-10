import React, {useState} from 'react';
// import logo from './logo.png';
import "./styles.css"
import './App.css';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { Route, Routes, useNavigate, useLocation } from 'react-router-dom';
import { EmptyPage } from './components/empty';
import {Navbar} from './components/navbar';
import { INavbarMenuItem } from "./utils/interfaces";
import { oneHourTS, hoursInMonth, oneDayTS } from "./utils/utils";

import { FeedbackPage } from "./pages/communication/feedback";
import { ChatPage } from "./pages/communication/chat";
import { NotificationsPage, INotification } from "./pages/communication/notifications";
import { BigSportEventsPage } from "./pages/digest/big_sport_events";
import { SportEventsSchedulePage } from "./pages/digest/sports_events_schedule";
import { SportsNewsPage } from "./pages/digest/sports_news";
import { AchievementsPage, IAchievementData, Intencity, Mood } from "./pages/my_sport/achievements";
import { ActivityPage, IChartValuesInputData } from "./pages/my_sport/activity";
import { TrainingPage, ITrainignData } from "./pages/my_sport/training";
import { GoalsPage } from "./pages/portfolio/goals";
import { PersonalPortfolioPage } from "./pages/portfolio/personal_portfolio";
import { QuestionariesAndSurveysPage } from "./pages/portfolio/questionnaires_and_surveys";
import { title } from 'process';

function getPageTitle(route: string, navbarItems: Array<INavbarMenuItem>){
  if (!route || !route.length){
    return "";
  }
  for(let item of navbarItems){
    if (item?.route === route)
      return item.text
  };
  return "";
}

function toOneLayer(data: Array<INavbarMenuItem>){
  const result: Array<INavbarMenuItem> = [];
  for (let item of data){
    if (item?.route)
      result.push(item);
    else if (item?.subitems){
      result.push(...toOneLayer(item.subitems));
    }
  }
  return result;
}

function genRandom(min: number, max: number) {
  const result = Math.floor(Math.random() * (max - min + 1)) + min;
  return result;
}
function genRandomArray(min: number, max: number, resultLen: number){
  const result: Array<number> = [];
  while (result.length < resultLen)
    result.push(genRandom(min, max));
  return result;
}
function genDateArray(resultLen: number){
  let currDate = new Date();
  currDate.setMinutes(0);
  currDate.setSeconds(0);
  currDate.setMilliseconds(0);

  const result: Array<Date> = [currDate];
  while (result.length < resultLen){
    currDate = new Date(currDate.getTime() - oneHourTS);
    // result.push(currDate);
    result.unshift(currDate);
  }
  return result;
}


function App() {
  const menuItems: Array<INavbarMenuItem> = [
    {
      text: "Мой спорт",
      subitems: [
        {
          text: "Мои тренировки",
          route: "/my-sport/my-trainings",
        },
        {
          text: "Моя активность",
          route: "/my-sport/my-activity",
        },
        {
          text: "Мои достижения",
          route: "/my-sport/my-achievements",
        },
      ],
    },
    {
      text: "Дайджест",
      subitems: [
        {
          text: "Расписание спорт. мероприятий",
          route: "/digest/sport-event-schedule",
        },
        {
          text: "События большого спорта",
          route: "/digest/big-sport-events",
        },
        {
          text: "Новости спорта",
          route: "/digest/sports-news",
        },
      ],
    },
    {
      text: "Портфолио",
      subitems: [
        {
          text: "Мои цели",
          route: "/portfolio/my-goals",
        },
        {
          text: "Личное портфолио",
          route: "/portfolio/personal-portfolio",
        },
        {
          text: "Анкеты и опросы",
          route: "/portfolio/questionnaires-and-surveys",
        },
      ],
    },
    {
      text: "Общение",
      subitems: [
        {
          text: "Чат",
          route: "/communication/chat",
        },
        {
          text: "Уведомления",
          route: "/communication/notifications",
        },
        {
          text: "Обратная связь",
          route: "/communication/feedback",
        },
      ],
    },
  ];
  const trainingPageData: ITrainignData = {
    title: "Примерный план тренировок на день:",
    training: [
      {
        title: "Утро:",
        items: [
          "Растяжка: 5 минут ",
          "Кардиоразминка: быстрая ходьба или лёгкий бег на месте (7–10 мин)",    
        ]
      },
      {
        title: "Основная тренировка силовая на выбор одного из блоков ниже:",
        items: []
      },
      {
        title: "Блок А тело целиком:",
        items: [
          "Приседания с собственным весом × 3 подхода по 15 повторений",
          "Выпады назад × 3 подхода по 10 раз каждой ногой",
          "Планка на локтях × 3 раза по 30 секунд",
          "Отжимания от пола × 3 подхода по максимуму повторений",
          "Обратные скручивания (ноги согнуты в коленях) × 3 подхода по 15 повторений",
        ]
      },
      {
        title: " Блок Б Верхняя часть тела:",
        items: [
          "Жим гантелей лёжа на горизонтальной скамье × 3 подхода по 8–12 повторений  ",
          "Тяга верхнего блока широким хватом × 3 подхода по 10–12 повторений ",
          "Подъём штанги на бицепс стоя × 3 подхода по 10–12 повторений ",
          "Французский жим сидя × 3 подхода по 10–12 повторений ",
          "Скручивания на наклонной скамье × 3 подхода по 15 повторений",
        ]
      },
      {
        title: "Блок В Нижняя часть тела",
        items: [
          "Сумо-приседания с гирей × 3 подхода по 10–12 повторений ",
          "Болгарские выпады (одно колено на возвышении) × 3 подхода по 10–12 повторений каждой ноги",
          "Гиперэкстензия × 3 подхода по 12–15 повторений ",
          "Румынская тяга с гантелями × 3 подхода по 10–12 повторений ",
          "Пресс на римском стуле × 3 подхода по 15 повторений",
        ]
      },
      {
        title: " Завершение тренировки",
        items: [
          "Динамическая растяжка основных групп мышц (5–7 минут)",
          "Холодный душ или контрастный душ",
        ]
      },
    ],
    dailyRoutine: {
      title: "Примерный распорядок дня:",
      items: [
        "7:00 Пробуждение, утреннее проветривание комнаты ",
        "7:10 Зарядка или легкая физическая активность (5—10 минут)  ",
        "7:20 Умывание, чистка зубов, гигиенические процедуры ",
        "7:30 Завтрак (здоровый завтрак, включающий белки, углеводы и клетчатку) ",
        "7:50 Выход на учебу",
        "8:30 Учебное время",
        "14:30 Обед",
        "15:35 Учебное время",
        "16:00 Отдых",
        "17:00 Тренировка",
        "20:00 Ужин",
        "21:00 Подготовка к сну, вечерний туалет",
        "22:00 Сон",
      ]
    }
  }
  const pulseData = {
    title: "Пульс (ЧСС) уд/мин",
    xAxis: genDateArray(hoursInMonth),
    yAxis: genRandomArray(60, 180, hoursInMonth),
  };
  const weightData = {
    title: "Вес, кг",
    xAxis: genDateArray(hoursInMonth),
    yAxis: genRandomArray(70, 80, hoursInMonth),

  };
  const stepsData = {
    title: "Пройдено шагов, шт",
    xAxis: genDateArray(hoursInMonth),
    yAxis: genRandomArray(3000, 30000, hoursInMonth),

  };
  console.log(pulseData);

  // const tgData = useLaunchParams();
  // const getUserName = () => {
  //   return `${tgData?.tgWebAppData?.user?.username}: ${tgData?.tgWebAppData?.user?.first_name} ${tgData?.tgWebAppData?.user?.last_name}`.trim();
  // };
  const userStr = "@test: Test Testovich";
  const location = useLocation();
  const achievements: Array<IAchievementData> = [
    {
      physicalData: {
        steps: 8921,
        pulse: 90,
        weight: 78.2,
        fatPercents: 14.5,
      },
      challengeData: {
        goal: "Выполнить все тренировки",
        activity: "Зал, плавание",
        trainingDurationMinutes: 180,
        trainingIntencity: Intencity.middle,
        afterTraining: "Лучше чем обычно",
        nutrition: "",
      },
      wellBeing: {
        mood: Mood.height,
        reason: "",
      },
      progress: {
        succeed: true,
        successToday: "Всё чётко по технике",
        successTomorrow: "Увеличить рабочий вес в жиме лёжа на 5 кг",
      },
      motivation: {
        quoteOfTheDay: "No pain - no gain",
        whySportIsImportant: "Движение - жизнь!",
      },
      date: new Date(2025, 5, 2)
    },
    {
      physicalData: {
        steps: 8921,
        pulse: 90,
        weight: 78.2,
        fatPercents: 14.5,
      },
      challengeData: {
        goal: "Выполнить все тренировки",
        activity: "Зал, плавание",
        trainingDurationMinutes: 180,
        trainingIntencity: Intencity.middle,
        afterTraining: "Лучше чем обычно",
        nutrition: "",
      },
      wellBeing: {
        mood: Mood.height,
        reason: "",
      },
      progress: {
        succeed: true,
        successToday: "Всё чётко по технике",
        successTomorrow: "Увеличить рабочий вес в жиме лёжа на 5 кг",
      },
      motivation: {
        quoteOfTheDay: "No pain - no gain",
        whySportIsImportant: "Движение - жизнь!",
      },
      date: new Date(2025, 5, 1)
    }

  ];

  const notifications: Array<INotification> = [
    {
      text: "Завтрашняя тренировка отменяется",
      crew: "Футбольная команда",
      type: "Тренировки",
      date: new Date(),
    },
    {
      text: "Завтрашнее занятие будет проводиться на улице. Берите с собой куртки",
      crew: "Физкультура 9Б",
      type: "Тренировки",
      date: new Date((new Date()).getTime() - oneDayTS),
    },
    {
      text: "Сегодня организовываем игру в коробке у школы №10",
      crew: "Футбольная команда",
      type: "Игры",
      date: new Date((new Date()).getTime() - 3 * oneDayTS),
    },
    {
      text: "Учитель заболел, физ-ры не будет неделю",
      crew: "Физкультура 9Б",
      type: "Сообщение",
      date: new Date((new Date()).getTime() - 10 * oneDayTS),
    }
  ];

  return (
    <div className="App">
      <Navbar openedPageTitle={getPageTitle(location.pathname, toOneLayer(menuItems))} menuItems={menuItems} userStr={userStr}/>
      <Routes>
        <Route index element={<EmptyPage/>}/>
        <Route path="/my-sport/my-trainings" element={<TrainingPage data={trainingPageData}/>}/>
        <Route path="/my-sport/my-activity" element={<ActivityPage pulseData={pulseData} weightData={weightData} stepsData={stepsData}/>}/>
        <Route path="/my-sport/my-achievements" element={<AchievementsPage data={achievements}/>}/>

        <Route path="/digest/sport-event-schedule" element={<SportEventsSchedulePage/>}/>
        <Route path="/digest/big-sport-events" element={<BigSportEventsPage/>}/>
        <Route path="/digest/sports-news" element={<SportsNewsPage/>}/>

        <Route path="/portfolio/my-goals" element={<GoalsPage/>}/>
        <Route path="/portfolio/personal-portfolio" element={<PersonalPortfolioPage/>}/>
        <Route path="/portfolio/questionnaires-and-surveys" element={<QuestionariesAndSurveysPage/>}/>

        <Route path="/communication/chat" element={<ChatPage/>}/>
        <Route path="/communication/notifications" element={<NotificationsPage data={notifications}/>}/>
        <Route path="/communication/feedback" element={<FeedbackPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
