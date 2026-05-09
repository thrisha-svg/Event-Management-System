import wedding from "./wedding";

const birthday = {
  name: "Birthday",
  icon: "🎂",
  desc: "Birthday events",
  services: [
     {
      name: "Balloon Decoration",
      price: 1500,
      icon: "🎈",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d"
    },
     {
      name: "Theme Decoration",
      price: 3000,
      icon: "🎉",
      image: "https://images.unsplash.com/photo-1521336575822-6da63fb45455"
    },
    {
      name: "Birthday Cake",
      price: 1200,
      icon: "🍰",
      image: "https://images.unsplash.com/photo-1464349153735-7db50ed83c84"
    },
     {
      name: "DJ Setup",
      price: 2500,
      icon: "🎧",
      image: "https://images.unsplash.com/photo-1506157786151-b8491531f063"
    },
     {
      name: "Photographer",
      price: 2000,
      icon: "📸",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
    },
     {
      name: "Magic Show",
      price: 1800,
      icon: "🎩",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176"
    }
  ]
};
const namingceremony={
  name: "Naming Ceremony",
  icon: "👶",
  desc: "Celebrate your baby's special day",
  services: [
    {
      name: "Priest Booking",
      price: 2000,
      icon: "🪔",
      image: "https://images.unsplash.com/photo-1548013146-72479768bada"
      
    },
    {
      name: "Puja Setup",
      price: 1500,
      icon: "🙏",
      image: "https://images.unsplash.com/photo-1606293926075-69a00dbfde81"
    },
    {
      name: "Cradle Decoration",
      price: 2500,
      icon: "🍼",
      image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3"
    },
    {
      name: "Flower Decoration",
      price: 3000,
      icon: "🌸",
      image: "https://images.unsplash.com/photo-1529636798458-92182e662485"
    },
    {
      name: "Catering Service",
      price: 4000,
      icon: "🍽️",
      image: "https://images.unsplash.com/photo-1555244162-803834f70033"
    },
    {
      name: "Photography",
      price: 2000,
      icon: "📸",
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32"
    }
  ]
}


const categories = [wedding, birthday,namingceremony];

export default categories;

