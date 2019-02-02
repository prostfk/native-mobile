export default class CommonUtil {

    static getLocalDate(date, locale = "ru"){
        return new Date(date).toLocaleDateString(locale);
    }

}