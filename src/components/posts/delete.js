import postResources from "../../resources/post";

export const Delete = (props) => {

  async function handleClick() {
    await postResources.deletePost(props._id);
    props.onPostDelete();
  }

  return (
    <div className="container">
      <div className="d-md-flex d-grid gap-2 d-md-flex mb-1 justify-content-md-end">
        <button
          onClick={handleClick}
          type="button"
          className="btn btn-primary me-md-1 btn-sm "
        >
          Delete
        </button>
      </div>
    </div>
  );
};
