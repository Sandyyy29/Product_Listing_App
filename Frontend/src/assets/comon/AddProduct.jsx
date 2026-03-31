import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/product-categories")
      .then(res => setCategories(res.data));
  }, []);
  const handleAddCategory = () => {
    if (!newCategory) return;

    if (!categories.includes(newCategory)) {
      setCategories([...categories, newCategory]);
      setNewCategory("");
    } else {
      alert("Category already exists");
    }
  };

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .required("Price is required"),
    category: Yup.string().required("Category is required"),
    image_url: Yup.string()
      .typeError("invalid URL")
      .required("image required"),
    description: Yup.string()
  });

  return (

    <div className="form-container">
      <h2>Add Product</h2>

      <Formik
  initialValues={{
    name: "",
    price: "",
    category: "",
    image_url: "",
    description: ""
  }}
  validationSchema={validationSchema}
  onSubmit={(values, { resetForm }) => {
    axios.post("http://127.0.0.1:8000/api/products", values)
      .then(() => {
        alert("Product Added Successfully");
        resetForm();
      })
      .catch(err => console.log(err));
  }}
>
  {({ setFieldValue }) => (
    <Form className="form">


      <div style={{ marginBottom: "20px" }}>
        <h3>Add Category</h3>

        <input
          type="text"
          placeholder="Enter category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
        />

        <button
          type="button"
          onClick={() => {
            if (!newCategory) return;

            if (!categories.includes(newCategory)) {
              setCategories([...categories, newCategory]);

          
              setFieldValue("category", newCategory);

              setNewCategory("");
            } else {
              alert("Category already exists");
            }
          }}
        >
          Add
        </button>
      </div>


      <Field name="name" placeholder="Product Name" />
      <ErrorMessage name="name" component="div" className="error" />


      <Field name="price" placeholder="Price" />
      <ErrorMessage name="price" component="div" className="error" />


      <Field as="select" name="category">
        <option value="">Select Category</option>

        {categories.map((cat, index) => (
          <option key={index} value={cat}>
            {cat}
          </option>
        ))}
      </Field>

      <ErrorMessage name="category" component="div" className="error" />


      <Field name="image_url" placeholder="Image URL" />
      <ErrorMessage name="image_url" component="div" className="error" />

      <Field name="description" placeholder="Description" />

      <button type="submit">Add Product</button>

    </Form>
  )}
</Formik>
    </div>
  );
}

export default Admin;