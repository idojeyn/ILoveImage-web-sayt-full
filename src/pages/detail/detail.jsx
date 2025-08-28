import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Navbar from "../../components/navbar/navbar";
import Resize from "../../cards/resize/resize";
import ConvertToJpg from "../../cards/convertToJpg/convertToJpg";
import ConvertFromJpg from "../../cards/convertFromJpg/convertFromJpg";
import BlurFace from "../../cards/blurFace/blurFace";
import Compress from "../../cards/compress/compress";
import UpscaleImage from "../../cards/upscale/upscale";
import ContainerPhotoEditor from "../../cards/editor/editor";
import RemoveBackground from "../../cards/removeBg/removeBg";
import CropImage from "../../cards/crop/crop";
import WatermarkImage from "../../cards/watermark/watermark";
import MemeGenerator from "../../cards/meme/meme";
import RotateImage from "../../cards/rotate/rotate";
import HtmlToImage from "../../cards/htmltoImg/htmltoImg";

function Detail() {
  const { toolPath } = useParams();
  const tools = useSelector((state) => state.tools.tools);
  const navigate = useNavigate();

  const tool = tools.find((t) => t.path.slice(1) === toolPath);

  if (!tool) {
    return (
      <>
        <Navbar />
        <h2 className="text-center p-5">Tool not found ❌</h2>
        <div
          onClick={() => navigate("/")}
          className="btn btn-outline-primary d-block mx-auto"
        >
          Back
        </div>
      </>
    );
  }

  let PageComponent;

  switch (tool.path) {
    case "/compress-image":
      PageComponent = <Compress />;
      break;
    case "/resize-image":
      PageComponent = <Resize/>;
      break;
    case "/crop-image":
      PageComponent = <CropImage />;
      break;
    case "/convert-to-jpg":
      PageComponent = <ConvertToJpg />;
      break;
    case "/convert-from-jpg":
      PageComponent = <ConvertFromJpg />;
      break;
    case "/photo-editor":
      PageComponent = <ContainerPhotoEditor />;
      break;
    case "/upscale-image":
      PageComponent = <UpscaleImage />;
      break;
    case "/remove-background":
      PageComponent = <RemoveBackground/>;
      break;
    case "/watermark-image":
      PageComponent = <WatermarkImage />;
      break;
    case "/meme-generator":
      PageComponent = <MemeGenerator />;
      break;
    case "/rotate-image":
      PageComponent = <RotateImage />;
      break;
    case "/html-to-image":
      PageComponent = <HtmlToImage />;
      break;
    case "/blur-face":
      PageComponent = <BlurFace />;
      break;
    default:
      PageComponent = (
        <div>
          <h2 className="text-center p-5">Tool not implemented ❌</h2>
          <div
            onClick={() => navigate("/")}
            className="btn btn-outline-primary d-block mx-auto"
          >
            Back
          </div>
        </div>
      );
  }

  return (
    <>
      <Navbar />
      {PageComponent}
    </>
  );
}

export default Detail