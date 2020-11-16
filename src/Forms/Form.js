import { useState } from "react";

import "./Form.css";

export default function Form(props) {
  const [image, setImage] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [error, setError] = useState("");

  const setInputState = (e) => {
    if (error) setError("");
    switch (e.target.id) {
      case "image":
        setImage(e.target.value);
        setImagePath(URL.createObjectURL(e.target.files[0]));
        break;
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    return props.setPointDetails({
      image,
      imagePath,
      description,
      date,
      title,
    });
  };

  return (
    <form
      onSubmit={(e) => {
        handleSubmit(e);
      }}
      className={"form_main"}
    >
      <h2>Add Details</h2>
      <label>Title</label>
      <input
        type="text"
        value={title}
        id={"title"}
        onChange={(e) => setInputState(e)}
      />
      <label>Image</label>
      <input
        type="file"
        value={image}
        id={"image"}
        onChange={(e) => setInputState(e)}
      />
      {imagePath ? (
        <img src={imagePath} alt="preview" className="form_image_preview" />
      ) : null}
      <label>Description</label>
      <input
        type="text area"
        value={description}
        id={"description"}
        onChange={(e) => setInputState(e)}
      />
      <label>Date</label>
      <input
        type="date"
        value={date}
        id={"date"}
        onChange={(e) => setInputState(e)}
      />
      <button type="submit">Submit</button>
    </form>
  );
}
