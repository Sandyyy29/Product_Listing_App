import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Admin = () => {

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
            .catch(err => {
              console.log(err);
            });

        }}
      >
        <Form className="form">

          <Field name="name" placeholder="Product Name" />
          <ErrorMessage name="name" component="div" className="error" />

          <Field name="price" placeholder="Price" />
          <ErrorMessage name="price" component="div" className="error" />

          <Field as="select" name="category">
            <option value="">Select Category</option>
            <option value="Iphone">Iphone</option>
            <option value="Samsung">Samsung</option>
            <option value="OnePlus">OnePlus</option>
          </Field>
          <ErrorMessage name="category" component="div" className="error" />

          <Field name="image_url" placeholder="Image URL" />
          <ErrorMessage name="image_url" component="div" className="error" />

          <Field name="description" placeholder="Description" />

          <button type="submit">Add Product</button>

        </Form>
      </Formik>
    </div>
  );
}

export default Admin;