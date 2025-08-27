import { useDispatch, useSelector } from "react-redux";
import { setCategory } from "../../store/toolsSlice";

export default function CategoryTabs() {
  const dispatch = useDispatch();
  const { activeCategory } = useSelector((state) => state.tools);

  const categories = ["All", "Optimize", "Create", "Edit", "Convert", "Security"];

  return (
    <div className="d-flex gap-2 justify-content-center mt-3">
      {categories.map((cat) => (
        <button
          key={cat}
          className={`btn rounded-5 ${
            activeCategory === cat ? "btn-dark" : "btn-outline-dark"
          }`}
          onClick={() => dispatch(setCategory(cat))}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
