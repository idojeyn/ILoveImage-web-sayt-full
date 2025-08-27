import { useSelector } from "react-redux";
import './toolGrid.css'
import { useNavigate } from "react-router-dom";
function ToolsGrid() {

    const navigate = useNavigate("")

    const { tools, activeCategory } = useSelector((state) => state.tools);

    const filteredTools =
        activeCategory === "All"
            ? tools
            : tools.filter((tool) => tool.category === activeCategory);

    const getCategoryClass = (category) => {
        switch (category) {
            case "Optimize":
                return "green";
            case "Edit":
                return "blue";
            case "Convert":
                return "yellow";
            case "Create":
                return "feolet";
            case "Security":
                return "dark";
            default:
                return "text-primary";
        }
    };
    return (
        <div className="row g-4 mt-4">
            {filteredTools.map((tool) => (
                <div key={tool.id} className="col-md-3">
                    <div className="card shadow-sm h-100 p-3 clickable-card"
                        onClick={() => navigate(tool.path)}
                    >
                        <div className={`fs-1 mb-3 ${getCategoryClass(tool.category)}`}>
                            <i className={tool.icon}></i>
                        </div>
                        <h5 className="fw-bold">{tool.title}</h5>
                        <p className="text-muted desciption">{tool.desc}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}


export default ToolsGrid