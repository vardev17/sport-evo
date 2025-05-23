import { useRawInitData, useLaunchParams } from '@telegram-apps/sdk-react';


export function useTelegram() {
    // const webApp = window.Telegram.WebApp;
    // const user = webApp.initDataUnsafe?.user;
    // //const lang = webApp.initDataUnsafe?.user?.language_code === 'ru' ? 'ru' : 'en'
    // const lang = 'ru'
    // return {
    //   webApp,
    //   user,
    //   lang
    // };
    const dataStr = useRawInitData();
    const data = useLaunchParams();
    data.tgWebAppData?.user
    data.tgWebAppData?.user?.username
}