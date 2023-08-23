"use client";
import { addToCart } from "@/redux/features(slices)/cart/cartSlice";
import { useGetAllProductsQuery } from "@/redux/features(slices)/products/productsApi";
import { useAppDispatch } from "@/redux/store/hooks";
import Link from "next/link";
import { BsCart } from "react-icons/Bs";
import { FiHeart } from "react-icons/Fi";
import { useDispatch } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

function ProductList1() {
  const { data, error, isLoading } = useGetAllProductsQuery();
  console.log(data);
  const dispatch = useDispatch();

  const HandleAddToCart = (products) => {
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(addToCart(products));
    } else {
      toast.error("Please signin to add products to cart.");
    }
  };

  return isLoading ? (
    <div>Loading...</div>
  ) : error ? (
    <div className="flex justify-center text-2xl m-2 mt-4">error loading</div>
  ) : (
    <>
      <div className="text-2xl flex justify-center m-3">Featured Products</div>
      <div className="grid grid-cols-4 gap-10 m-10">
        {data?.map((products) => (
          <div
            key={products.id}
            className="mt-3 border border-black/20 rounded-lg"
          >
            <div>
              <span className="text-xl flex justify-center mt-3 mb-2">
                {products.name}
              </span>
              <div className="text-sm text-slate-500 mx-5 px-2">
                <div>Color: {products.color} </div>
                <div>Model: {products.Model}</div>
              </div>
            </div>
            <img src={products.image} alt={products.name} className="p-5" />
            <div className="mx-5 mt-5 text-lg">${products.price}</div>
            {/* <div className="text-sm mx-5 my-2 text-green-500">
              Free Shipping
            </div> */}
            <div className="mx-5 mb-5 mt-2 flex justify-between items-center">
              <Link
                href="/"
                className="text-slate-900/80 text-white hover:backdrop-lg group relative border border-black/10 px-2 py-2 rounded-lg bg-blue-600"
                onClick={() => HandleAddToCart(products)}
              >
                <div className="flex justify-center items-center gap-2">
                  Add to cart
                  <BsCart />
                </div>
                <div className="hidden text-sm p-1 rounded-lg text-white group-hover:block absolute top-8 right-0 bg-gray-500/80">
                  Add to Cart
                </div>
              </Link>
              <Link
                href="/"
                className="text-slate-900/80 text-xl hover:text-blue-500 hover:backdrop-lg group relative"
              >
                <FiHeart />
                <div className="hidden text-sm p-1 rounded-lg text-white group-hover:block absolute top-8 right-0 bg-gray-500/80">
                  Add to Wishlist
                </div>
              </Link>{" "}
            </div>
          </div>
        ))}
        <div className="col-span-1"></div>
      </div>
      <ToastContainer position={toast.POSITION.TOP_CENTER} />
    </>
  );
}

export default ProductList1;
