import React from 'react';
import logo from './logo.png';
import "./styles.css"
import './App.css';
import { useLaunchParams } from '@telegram-apps/sdk-react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { EmptyPage } from './components/empty';
import {Navbar} from './components/navbar';
import { INavbarMenuItem } from "./utils/interfaces";

import { FeedbackPage } from "./pages/communication/feedback";
import { ChatPage } from "./pages/communication/chat";
import { NotificationsPage } from "./pages/communication/notifications";
import { BigSportEventsPage } from "./pages/digest/big_sport_events";
import { SportEventsSchedulePage } from "./pages/digest/sports_events_schedule";
import { SportsNewsPage } from "./pages/digest/sports_news";
import { AchievementsPage } from "./pages/my_sport/achievements";
import { ActivityPage } from "./pages/my_sport/activity";
import { TrainingPage } from "./pages/my_sport/training";
import { GoalsPage } from "./pages/portfolio/goals";
import { PersonalPortfolioPage } from "./pages/portfolio/personal_portfolio";
import { QuestionariesAndSurveysPage } from "./pages/portfolio/questionnaires_and_surveys";

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

  // const tgData = useLaunchParams();
  // const getUserName = () => {
  //   return `${tgData?.tgWebAppData?.user?.username}: ${tgData?.tgWebAppData?.user?.first_name} ${tgData?.tgWebAppData?.user?.last_name}`.trim();
  // };
  const userStr = "@test: Test Testovich";


  return (
    <div className="App">
      <Navbar menuItems={menuItems} userStr={userStr}/>
      <Routes>
        <Route index element={<EmptyPage/>}/>
        <Route path="/my-sport/my-trainings" element={<TrainingPage/>}/>
        <Route path="/my-sport/my-activity" element={<ActivityPage/>}/>
        <Route path="/my-sport/my-achievements" element={<AchievementsPage/>}/>

        <Route path="/digest/sport-event-schedule" element={<SportEventsSchedulePage/>}/>
        <Route path="/digest/big-sport-events" element={<BigSportEventsPage/>}/>
        <Route path="/digest/sports-news" element={<SportsNewsPage/>}/>

        <Route path="/portfolio/my-goals" element={<GoalsPage/>}/>
        <Route path="/portfolio/personal-portfolio" element={<PersonalPortfolioPage/>}/>
        <Route path="/portfolio/questionnaires-and-surveys" element={<QuestionariesAndSurveysPage/>}/>

        <Route path="/communication/chat" element={<ChatPage/>}/>
        <Route path="/communication/notifications" element={<NotificationsPage/>}/>
        <Route path="/communication/feedback" element={<FeedbackPage/>}/>
      </Routes>
    </div>
  );
}

export default App;
