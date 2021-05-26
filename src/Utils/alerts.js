export default function Alert(props) {
  console.log(props.data);
  let divView = false;
  if (props.data.data !== "") {
    divView = true;
  }
  console.log(divView);
  return (
    <div
      className="alert justify-content-between"
      style={{
        backgroundColor: props.data.color,
        display: divView ? "flex" : "none",
        borderRadius: "17px"
      }}
      role="alert"
    >
      <div>
        <strong> {props.data.data}</strong>
      </div>
      <div>
        <button
          type="button"
          className="btn-close"
          aria-label="Close"
          onClick={props.onAlertClose}
        ></button>
      </div>
    </div>
  );
}
