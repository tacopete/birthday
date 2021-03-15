export type BirthdayMessage = {
  user: string;
  text: string;
  style: {
    color: string;
    fontFamily: string;
    fontSize: string;
  } & ({ bottom: number } | { top: number }) &
    ({ left: number } | { right: number });
};
