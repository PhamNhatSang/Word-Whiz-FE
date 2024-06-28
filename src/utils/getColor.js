import languagesWithColors from "../constant/category"
export default function getColor(language) {
    return languagesWithColors.find((item) => item.language === language)?.color || "#dbeafe"   
}
