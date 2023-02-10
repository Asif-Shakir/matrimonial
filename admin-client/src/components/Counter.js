import { useSelector, useDispatch } from "react-redux";
import { counterActions } from "../store/counter-slice";
const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.count);
  const show = useSelector((state) => state.counter.show);
  const incHandler = () => {
    dispatch(counterActions.increment());
  };
  const decHandler = () => {
    dispatch(counterActions.decrement());
  };
  const incByHandler = () => {
    dispatch(counterActions.increaseBy(10));
  };
  const toggleHandler = () => {
    dispatch(counterActions.toggle());
  };
  return (
    <div
      className="p-2 d-flex flex-column align-items-center gap-2"
      style={{ minHeight: "100px", background: "#e4e4e4" }}
    >
      <p>Counter: {count}</p>
      {show && (
        <div className="d-flex gap-3">
          <button className="btn btn-success" onClick={incHandler}>
            Increase
          </button>
          <button className="btn btn-success" onClick={decHandler}>
            Decrease
          </button>
          <button className="btn btn-success" onClick={incByHandler}>
            Increase By 10
          </button>
        </div>
      )}
      <button className="btn btn-success" onClick={toggleHandler}>
        Toggle
      </button>
    </div>
  );
};
export default Counter;
