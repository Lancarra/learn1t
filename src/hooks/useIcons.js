import icon1 from "../assets/icon1.jpg";
import icon2 from "../assets/icon2.jpg";
import icon3 from "../assets/icon3.jpg";
import icon4 from "../assets/icon4.jpg";
import icon5 from "../assets/icon5.jpg";
import icon6 from "../assets/icon6.jpg";
import icon8 from "../assets/icon8.webp";
import icon9 from "../assets/icon9.jpg";

const icons = [{
    id:1,
    src: icon1
},
    {
     id:2,
     src: icon2
    },
    {
        id:3,
        src: icon3
    },
    {
        id:4,
        src: icon4
    },
    {
        id:5,
        src: icon5
    },
    {
        id:6,
        src: icon6
    },
    {
        id:8,
        src: icon8
    },
    {
        id:9,
        src: icon9
    }]

export const useIcons = () => {
    return icons;
}