import React from 'react';
import { BrowserRouter as Router, Route, Routes,useParams, Navigate } from 'react-router-dom'; 
// import { Elements } from "@stripe/react-stripe-js";
// import { loadStripe } from "@stripe/stripe-js";
import AddOrderPage from './components/AddOrder';
import Home from './components/Home';
import ImageSlider from './components/ImageSlider';
import Logo from './components/logo';
import ProductPage from './components/ProductPage';
import RandomSubcategories from './components/RandomSubcategories';
import InfoPage from './components/InfoPage';
import EditProfilePage from './components/EditProfilePage';
import AuthPage from './components/AuthPage';
import ProfileForm from './components/ProfileForm';
import MyCartPage from './components/MyCartPage';
import Checkout from './components/Checkout';
// import Payment from './components/Payment';
import Success from './components/Success';
import MyOrders from './components/MyOrder';
import Wallet from './components/Wallet';
// Load Stripe.js outside of the component to avoid reload on every render
// const stripePromise = loadStripe('pk_test_51OvOARSBCSMufwm0t3L837kVexH3A1tmcKVNfhag43o2GvrOtNqzvabsZ73XsdBFt9vm4AU77HVt0rEHbqNksD5100Wdf1MiUA');
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/home" element={<PrivateRoute component={HomePage} />} />
          <Route path="/cart" element={<PrivateRoute component={MyCart} />} />
          <Route path="/success/:orderId" element={<PrivateRoute component={SuccessPage} />} />
          <Route path="/edit-profile" element={<PrivateRoute component={ProfilePage} />} />
          <Route path="/profile" element={<PrivateRoute component={UserProfilePage} />} />
          {/* <Route path="/payment/:totalPrice" element={<Elements stripe={stripePromise}><Payment /></Elements>} /> */}

          <Route path="/checkout" element={<PrivateRoute component={CheckoutPage} />} />
          {/* <Route path="/payment" element={<PrivateRoute component={PaymentPage} />} /> */}
          <Route path="/" element={<LoginRegisterPage />} />
          <Route path="/add-order" element={<PrivateRoute component={AddOrderPageWithSlider} />} />
          <Route path="/myorder" element={<PrivateRoute component={MyOrderPage} />} />
          <Route path="/wallet" element={<PrivateRoute component={WalletPage} />} />
          <Route path="/prod/:categoryId/:subcategoryId" element={<PrivateRoute component={ProductDetailPage} />} />
        </Routes>
        {/* <Elements stripe={stripePromise}>
          <Payment /> 
        </Elements> */}
      </Router>
    </div>
  );
}

// Parent component for the home page
function HomePage() {
  return (
    <div>
      <Logo />
      <Home />
      <ImageSlider />
      <InfoPage />
      <RandomSubcategories />
    </div>
  );
}
function ProfilePage() {
  return (
    <div>
      <EditProfilePage />
    </div>
  );
}
function WalletPage() {
  return (
    <div>
      <Wallet />
    </div>
  );
}
function MyCart() {
  return (
    <div>
      <MyCartPage />
    </div>
  );
}
function SuccessPage() {
  return (
    <div>
      <Success />
    </div>
  );
}
function UserProfilePage() {
  return (
    <div>
      <ProfileForm />
    </div>
  );
}
function LoginRegisterPage() {
  return (
    <div>
      <AuthPage />
    </div>
  );
}
function CheckoutPage() {
  return (
    <div>
      <Checkout />
    </div>
  );
}
// function PaymentPage() {
//   return (
//     <Elements stripe={stripePromise}>
//     <Payment /> {/* Wrap the component using useStripe() in the Elements provider */}
//   </Elements>
//   );
// }

// Parent component for the add order page with slider
function AddOrderPageWithSlider() {
  return (
    <div>
      <AddOrderPage />
    </div>
  );
}
function MyOrderPage() {
  return (
    <div>
      <MyOrders />
    </div>
  );
}

// PrivateRoute component for authenticated routes
function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = () => {
    // Implement your authentication logic here
    // For example, checking if a JWT token exists in localStorage
    return localStorage.getItem('token') !== null;
  };

  return isAuthenticated() ? <Component {...rest} /> : <Navigate to="/" />;
}

// ProductDetailPage component receives category and subcategory IDs from URL params
function ProductDetailPage() {
  const { categoryId, subcategoryId } = useParams();

  return (
    <div>
      <ProductPage categoryId={categoryId} subcategoryId={subcategoryId} />
    </div>
  );
}

export default App;
