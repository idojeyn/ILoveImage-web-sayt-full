import CategoryTabs from "../tools/CategoryTabs";
import ToolsGrid from "../tools/ToolsGrid";
import './main.css'
function Main() {
  return (
    <div className="pattern-bg">
      <div className="container py-5">
        <h1 className="text-center fw-bold mb-3">
          Every tool you could want to edit images in bulk
        </h1>
        <h5 className="text-center text-muted mb-4">
          Your online photo editor is here and forever free!
        </h5>
        <CategoryTabs />
        <ToolsGrid />
      </div>
    </div>
  );
}

export default Main;
