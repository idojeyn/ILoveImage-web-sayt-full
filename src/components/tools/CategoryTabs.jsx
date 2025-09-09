import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../store/toolsSlice";

export default function CategoryTabs() {
  const dispatch = useDispatch();
  const { activeCategory } = useSelector((state) => state.tools);

  const categories = ["All", "Optimize", "Create", "Edit", "Convert", "Security"];

  return (
    <div className="d-flex flex-wrap gap-2 justify-content-center mt-3 px-2">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`btn rounded-5 flex-shrink-0 ${
            activeCategory === cat ? "btn-dark" : "btn-outline-dark"
          }`}
          style={{ minWidth: "120px" }} // har bir tugma kichraymasin
          onClick={() => dispatch(setCategory(cat))}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}