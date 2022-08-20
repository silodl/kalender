export const GetDayView = (date: string) => {
    // date: yyyy-mm-dd
    window.localStorage.setItem("goToDate",date);
    window.location.href = "/idag";
}