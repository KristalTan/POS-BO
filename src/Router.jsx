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
} from "./scenes";

import Prod_Item from "./scenes/prod_item/prod_item.jsx";
import Add_Prod_Item from "./scenes/prod_item/add_prod_item.jsx";
import Edit_Prod_Item from "./scenes/prod_item/edit_prod_item.jsx";

import Meal_Period from "./scenes/meal_period/meal_period.jsx";
import Add_Meal_Period from "./scenes/meal_period/add_meal_period.jsx";
import Edit_Meal_Period from "./scenes/meal_period/edit_meal_period.jsx";

import Prod_Category from "./scenes/prod_category/prod_category.jsx";
import Add_Prod_Category from "./scenes/prod_category/add_prod_category.jsx";
import Edit_Prod_Category from "./scenes/prod_category/edit_prod_category.jsx";

import Prod_Modifier from "./scenes/prod_modifier/prod_modifier.jsx";
import Add_Prod_Modifier from "./scenes/prod_modifier/add_prod_modifier.jsx";

import Payment_Mode from "./scenes/payment_mode/payment_mode.jsx";
import Add_Payment_Mode from "./scenes/payment_mode/add_payment_mode.jsx";
import Edit_Payment_Mode from "./scenes/payment_mode/edit_payment_mode.jsx";

import Tax from "./scenes/tax/tax.jsx";
import Add_Tax from "./scenes/tax/add_tax.jsx";
import Edit_Tax from "./scenes/tax/edit_tax.jsx";


import Store from "./scenes/store/store.jsx";

import Table_Section from "./scenes/table_section/table_section.jsx";
import Add_Table_Section from "./scenes/table_section/add_table_section.jsx";
import Edit_Table_Section from "./scenes/table_section/edit_table_section.jsx";

import Table_Location from "./scenes/table_location/table_location.jsx";
import Add_Table_Location from "./scenes/table_location/add_table_location.jsx";
import Edit_Table_Location from "./scenes/table_location/edit_table_location.jsx";

import User_Group from "./scenes/user_group/user_group.jsx";
import Add_User_Group from "./scenes/user_group/add_user_group.jsx";
import Edit_User_Group from "./scenes/user_group/edit_user_group.jsx";

import User from "./scenes/user/user.jsx";
import Add_User from "./scenes/user/add_user.jsx";
import Edit_User from "./scenes/user/edit_user.jsx";

import General_Setting from "./scenes/general_setting/general_setting.jsx";

import Printer from "./scenes/printer/printer.jsx";
import Add_Printer from "./scenes/printer/add_printer.jsx";
import Edit_Printer from "./scenes/printer/edit_printer.jsx";

import Station from "./scenes/station/station.jsx";
import Add_Station from "./scenes/station/add_station.jsx";
import Edit_Station from "./scenes/station/edit_station.jsx";

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
          <Route path="/meal-period/add" element={<Add_Meal_Period />} />
          <Route path="/meal-period/edit" element={<Edit_Meal_Period />} />


          <Route path="/product-category" element={<Prod_Category />} />
          <Route path="/product-category/add" element={<Add_Prod_Category />} />
          <Route path="/product-category/edit" element={<Edit_Prod_Category />} /> 

          <Route path="/product-item" element={<Prod_Item />} />
          <Route path="/product-item/add" element={<Add_Prod_Item />} />
          <Route path="/product-item/edit" element={<Edit_Prod_Item />} />

          <Route path="/product-modifier" element={<Prod_Modifier />} />
          <Route path="/product-modifier/add" element={<Add_Prod_Modifier />} />

          {/* Payment Settings */}
          <Route path="/payment-mode" element={<Payment_Mode />} />
          <Route path="/payment-mode/add" element={<Add_Payment_Mode />} />
          <Route path="/payment-mode/edit" element={<Edit_Payment_Mode />} />

          <Route path="/tax" element={<Tax />} />
          <Route path="/tax/add" element={<Add_Tax />} />
          <Route path="/tax/edit" element={<Edit_Tax />} />


          {/* Store Settings */}
          <Route path="/store" element={<Store />} />

          <Route path="/table-sec" element={<Table_Section />} />
          <Route path="/table-sec/add" element={<Add_Table_Section />} />
          <Route path="/table-sec/edit" element={<Edit_Table_Section />} />

          <Route path="/table" element={<Table_Location />} />
          <Route path="/table/add" element={<Add_Table_Location />} />
          <Route path="/table/edit" element={<Edit_Table_Location />} />

          {/* User Settings */}
          <Route path="/user-group" element={<User_Group />} />
          <Route path="/user-group/add" element={<Add_User_Group />} />
          <Route path="/user-group/edit" element={<Edit_User_Group />} />

          <Route path="/user" element={<User />} />
          <Route path="/user/add" element={<Add_User/>} />
          <Route path="/user/edit" element={<Edit_User />} />

          <Route path="/general-setting" element={<General_Setting />} />

          {/* machine Settings */}
          <Route path="/printer" element={<Printer />} />
          <Route path="/printer/add" element={<Add_Printer/>} />
          <Route path="/printer/edit" element={<Edit_Printer />} />

          <Route path="/station" element={<Station />} />
          <Route path="/station/add" element={<Add_Station/>} />
          <Route path="/station/edit" element={<Edit_Station />} />

        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
