import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useState, useEffect } from "react";

const Admin = () => {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/product-categories")
      .then(res => setCategories(res.data))
      .catch(err => console.log("Category Fetch Error:", err));
  }, []);

  const validationSchema = Yup.object({
    name: Yup.string().required("Product name is required").max(30, "Name must be less than 30 characters"),
    brand: Yup.string().required("Brand is required"),
    price: Yup.number().typeError("Must be a number").positive().required("Price is required"),
    original_price: Yup.number().typeError("Must be a number").min(Yup.ref('price'), "MRP must be higher than Sale Price"),
    category: Yup.string().required("Category is required"),
    stock: Yup.number().integer().min(0).required("Stock is required"),
    description: Yup.string().required("Description is required"),
    main_image: Yup.mixed().required("Main image is required"),
  });

  return (
    <div className="admin-wrapper">
      <div className="form-container">
        <h2>SnapShop Admin - Add Product</h2>

        <Formik
          initialValues={{
            name: "",
            brand: "",
            price: "",
            original_price: "",
            category: "",
            stock: 0,
            description: "",
            specifications: "",
            main_image: null,
            gallery_images: []
          }}
          validationSchema={validationSchema}
          onSubmit={async (values, { resetForm }) => {
            const data = new FormData();
            data.append("name", values.name);
            data.append("brand", values.brand);
            data.append("price", values.price);
            data.append("original_price", values.original_price);
            data.append("category", values.category);
            data.append("stock", values.stock);
            data.append("description", values.description);
            
            
            const specsArray = values.specifications.split(",").map(s => s.trim());
            data.append("specifications", JSON.stringify(specsArray));

            data.append("main_image", values.main_image);

   
            values.gallery_images.forEach((file) => {
              data.append("gallery_images[]", file);
            });

            try {
              await axios.post("http://127.0.0.1:8000/api/products", data, {
                headers: { "Content-Type": "multipart/form-data" }
              });
              alert("✅ Product Published to SnapShop!");
              resetForm();
            } catch (err) {
              console.error("Upload Error:", err.response?.data || err.message);
              alert("❌ Failed to add product. Check console.");
            }
          }}
        >
          {({ setFieldValue, values }) => (
            <Form className="form">
              
              <div className="category-section">
                <input
                  type="text"
                  placeholder="New Category"
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value)}
                />
                <button type="button" onClick={() => {
                  if (newCategory && !categories.includes(newCategory)) {
                    setCategories([...categories, newCategory]);
                    setFieldValue("category", newCategory);
                    setNewCategory("");
                  }
                }}>Add Category</button>
              </div>

              <div className="input-grid">
                <div className="field-box">
                  <Field name="name" placeholder="Product Name" />
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
                <div className="field-box">
                  <Field name="brand" placeholder="Brand Name" />
                  <ErrorMessage name="brand" component="div" className="error" />
                </div>
              </div>

              <div className="input-grid">
                <div className="field-box">
                  <Field name="price" type="number" placeholder="Sale Price" />
                  <ErrorMessage name="price" component="div" className="error" />
                </div>
                <div className="field-box">
                  <Field name="original_price" type="number" placeholder="Original Price (MRP)" />
                  <ErrorMessage name="original_price" component="div" className="error" />
                </div>
              </div>

              <div className="input-grid">
                <div className="field-box">
                  <Field as="select" name="category">
                    <option value="">Select Category</option>
                    {categories.map((cat, index) => <option key={index} value={cat}>{cat}</option>)}
                  </Field>
                  <ErrorMessage name="category" component="div" className="error" />
                </div>
                <div className="field-box">
                  <Field name="stock" type="number" placeholder="Stock Quantity" />
                  <ErrorMessage name="stock" component="div" className="error" />
                </div>
              </div>

              <Field as="textarea" name="description" placeholder="Product Description" rows="4" />
              <ErrorMessage name="description" component="div" className="error" />

              <Field name="specifications" placeholder="Specs (e.g. 12GB RAM, 5G, 5000mAh)" />

              <div className="file-section">
                <label>Main Product Image</label>
                <input type="file" onChange={(e) => setFieldValue("main_image", e.target.files[0])} />
                <ErrorMessage name="main_image" component="div" className="error" />
              </div>

              <div className="file-section">
                <label>Gallery Images (Select Multiple)</label>
                <input type="file" multiple onChange={(e) => setFieldValue("gallery_images", Array.from(e.target.files))} />
              </div>

              <button type="submit" className="submit-btn">Publish Product</button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Admin;