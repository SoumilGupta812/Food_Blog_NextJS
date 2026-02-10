"use client";
import { useRef, useState } from "react";
import classes from "./image-picker.module.css";
import Image from "next/image";
export default function MealPicker({ label, name }) {
  const [pickedImage, setPickedImage] = useState();
  const imageRef = useRef();
  function handleClick() {
    imageRef.current.click();
  }
  function handleChange(event) {
    const file = event.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPickedImage(fileReader.result);
    };
    fileReader.readAsDataURL(file);
  }
  return (
    <div className={classes.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={classes.control}>
        <div className={classes.preview}>
          {!pickedImage && <p>No Image Picked yet.</p>}
          {pickedImage && (
            <Image src={pickedImage} fill alt="User Picked Image." />
          )}
        </div>
        <input
          type="file"
          id={name}
          accept="image/png, image/jpeg"
          name={name}
          className={classes.input}
          ref={imageRef}
          onChange={handleChange}
          required
        ></input>
        <button type="button" className={classes.button} onClick={handleClick}>
          Pick an Image
        </button>
      </div>
    </div>
  );
}
