import React, { Fragment, useContext, useState } from "react";
import "./Create.css";
import { FirebaseContext, AuthContext } from "../../store/Context";
import toast from "react-hot-toast";

const Create = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(AuthContext);
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);

  const handleSubmit = () => {
    if (!name || name !== name.trim()) {
      return toast.error(
        "Product name cannot be empty or contain only whitespaces."
      );
    }

    if (!category || category !== category.trim()) {
      return toast.error(
        "Category cannot be empty or contain only whitespaces."
      );
    }

    if (price <= 0) {
      return toast.error("Price should be greater than 0.");
    }

    if (!image) {
      return toast.error("Please upload an image to continue.");
    }

    firebase
      .storage()
      .ref(`/image/${image?.name}`)
      .put(image)
      .then(({ ref }) => {
        ref.getDownloadURL().then((url) => {
          firebase.firestore().collection("products").add({
            name,
            category,
            price,
            imgURL: url,
            userId: user.uid,
            createdAt: new Date().toDateString(),
          });
        });
      })
      .catch(() => toast.error("Please upload an image to continue."));
  };

  return (
    <Fragment>
      <card>
        <div className="centerDiv">
          <label htmlFor="fname">Name</label>
          <br />
          <input
            className="input"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="fname"
            name="Name"
          />
          <br />
          <label htmlFor="fname">Category</label>
          <br />
          <input
            className="input"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="fname"
            name="category"
          />
          <br />
          <label htmlFor="fname">Price</label>
          <br />
          <input
            className="input"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="fname"
            name="Price"
          />
          <br />

          <br />
          <img
            alt="Posts"
            width="200px"
            height="200px"
            src={image && URL.createObjectURL(image)}
          ></img>

          <br />
          <input type="file" onChange={(e) => setImage(e.target.files[0])} />
          <br />
          <button onClick={handleSubmit} className="uploadBtn">
            Upload and Submit
          </button>
        </div>
      </card>
    </Fragment>
  );
};

export default Create;
