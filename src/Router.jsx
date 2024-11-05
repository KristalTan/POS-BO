import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import {
  Dashboard,
  Team,
  Invoices,
  Contacts,
  Form,
  Bar,
  Line,
  Pie,
  FAQ,
  Geography,
  Calendar,
  Stream,

  Meal_Period,

  Prod_Category,
  Add_Prod_Category,
  Edit_Prod_Category,

  Prod_Item,

  Prod_Modifier,
  Payment_Mode,
} from "./scenes";


const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contacts" element={<Contacts />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/form" element={<Form />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/bar" element={<Bar />} />
          <Route path="/pie" element={<Pie />} />
          <Route path="/stream" element={<Stream />} />
          <Route path="/line" element={<Line />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/geography" element={<Geography />} />
          {/* Product Settings */}
          <Route path="/meal-period" element={<Meal_Period />} />
 

          <Route path="/product-category" element={<Prod_Category />} />
          <Route path="/product-category/add" element={<Add_Prod_Category />} />
          <Route path="/product-category/edit" element={<Edit_Prod_Category />} /> 

          <Route path="/product-item" element={<Prod_Item />} />

          <Route path="/product-modifier" element={<Prod_Modifier />} />

          {/* Payment Settings */}
          <Route path="/payment_mode" element={<Payment_Mode />} />


        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
