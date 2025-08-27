import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tools: [
    {
      id: 1,
      title: "Compress IMAGE",
      desc: "Compress JPG, PNG, SVG, and GIFs while saving space and maintaining quality.",
      category: "Optimize",
      icon: "fas fa-compress",
      path: "/compress-image"
    },
    {
      id: 2,
      title: "Resize IMAGE",
      desc: "Define your dimensions, by percent or pixel, and resize your JPG, PNG, SVG, and GIF images.",
      category: "Edit",
      icon: "fas fa-expand",
      path: "/resize-image"
    },
    {
      id: 3,
      title: "Crop IMAGE",
      desc: "Crop JPG, PNG, or GIFs with ease; Choose pixels to define your rectangle or use our visual editor.",
      category: "Edit",
      icon: "fas fa-crop",
      path: "/crop-image"
    },
    {
      id: 4,
      title: "Convert to JPG",
      desc: "Turn PNG, GIF, TIF, PSD, SVG, WEBP, HEIC, or RAW format images to JPG in bulk with ease.",
      category: "Convert",
      icon: "fas fa-file-image",
      path: "/convert-to-jpg"
    },
    {
      id: 5,
      title: "Convert from JPG",
      desc: "Turn JPG images to PNG and GIF. Choose several JPGs to create an animated GIF in seconds!",
      category: "Convert",
      icon: "fas fa-file",
      path: "/convert-from-jpg"
    },
    {
      id: 6,
      title: "Photo editor",
      desc: "Spice up your pictures with text, effects, frames or stickers. Simple editing tools for your image needs.",
      category: "Create",
      icon: "fas fa-edit",
      path: "/photo-editor"
    },
    {
      id: 7,
      title: "Upscale Image",
      desc: "Enlarge your images with high resolution. Easily increase the size of your JPG and PNG images while maintaining visual quality.",
      category: "Optimize",
      icon: "fas fa-arrows-alt",
      path: "/upscale-image"
    },
    {
      id: 8,
      title: "Remove background",
      desc: "Quickly remove image backgrounds with high accuracy. Instantly detect objects and cut out backgrounds with ease.",
      category: "Optimize",
      icon: "fas fa-eraser",
      path:"/remove-background"
    },
    {
      id: 9,
      title: "Watermark IMAGE",
      desc: "Stamp an image or text over your images in seconds. Choose the typography, transparency and position.",
      category: "Security",
      icon: "fas fa-water",
      path:  "/watermark-image"
    },
    {
      id: 10,
      title: "Meme generator",
      desc: "Create your memes online with ease. Caption meme images or upload your pictures to make custom memes.",
      category: "Create",
      icon: "fas fa-smile",
      path: "/meme-generator"
    },
    {
      id: 11,
      title: "Rotate IMAGE",
      desc: "Rotate many images JPG, PNG or GIF at same time. Choose to rotate only landscape or portrait images!",
      category: "Edit",
      icon: "fas fa-sync-alt",
      path: "/rotate-image"
    },
    {
      id: 12,
      title: "HTML to IMAGE",
      desc: "Convert webpages in HTML to JPG or SVG. Copy and paste the URL of the page you want and convert it to IMAGE with a click.",
      category: "Convert",
      icon: "fas fa-code",
      path: "/html-to-image"
    },
    {
      id: 13,
      title: "Blur face",
      desc: "Easily blur out faces in photos. You can also blur licence plates and other objects to hide private information.",
      category: "Security",
      icon: "fas fa-user-secret",
      path: "/blur-face"
    },
  ],
  activeCategory: "All",
};

const toolsSlice = createSlice({
  name: "tools",
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.activeCategory = action.payload;
    },
  },
});

export const { setCategory } = toolsSlice.actions;
export default toolsSlice.reducer;
