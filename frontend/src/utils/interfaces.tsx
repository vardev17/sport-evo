export interface IUserData {
  first_name: string;
  last_name: string;
  username?: string;
}

export interface INavbarMenuItem {
  text: string;
  route?: string;
  subitems?: Array<INavbarMenuItem>;
}
