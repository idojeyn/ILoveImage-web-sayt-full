// store/workSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [
    {
      id: 1,
      title: "Switch to document mode",
      desc: "Use iLovePDF to simplify PDF editing when your work goes beyond images.",
      image: "/image/ilovepdf@2x.webp",
    },
    {
      id: 2,
      title: "Scan and edit on the go",
      desc: "Scan paper documents and access quick image tools anytime with the iLovePDF Mobile App.",
      image: "/image/mobile@2x.webp",
    },
    {
      id: 3,
      title: "Scale with the iLoveIMG API",
      desc: "Automate image tasks at scale by integrating powerful editing tools into your product or workflow.",
      image: "/image/api@2x.webp",
    },
    {
      id: 4,
      title: "Get more with Premium",
      desc: "Work faster and smarter with advanced editing tools, batch processing, and powerful AI features —built for high-demand workflows.",
      image: "/image/premium@2x.webp", 
      large: true,
    },
  ],
};

const workSlice = createSlice({
  name: "work",
  initialState,
  reducers: {},
});


export const selectWorkItems = (state) => state.work.items;

export default workSlice.reducer;