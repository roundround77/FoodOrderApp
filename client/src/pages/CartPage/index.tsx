import { FC, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../App";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import { ROUTES } from "../../constants/routes";
import { STORAGE } from "../../constants/storage";
import { UserContext } from "../../layouts/UserLayout";
import { createOrderRequest } from "../../services/order.service";
import { getRoundedNum } from "../../utils/getRoundedNum";
import { getListFromStorage } from "../../utils/storage";

export interface IDish {
  id: string;
  name: string;
  quantity: number;
  restaurant: string;
  price: number;
  image: string;
  orderDate: string;
}

const CartPage: FC = () => {
  const [dishes, setDishes] = useState<IDish[]>([]);

  const { role } = useContext(AuthContext);
  const { decreaseTotalCartItems, resetTotalCartItems } =
    useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    setDishes(getListFromStorage(STORAGE.DISHES));
  }, []);

  const handleEdit = (id: string) => {
    const quantity = prompt("Enter quantity:");
    if (quantity) {
      if (Number.isInteger(Number(quantity))) {
        const total = +quantity;
        if (total) {
          setDishes((dishes) => {
            const newDishes = dishes.map((dish) => {
              if (dish.id === id) {
                dish.quantity = Math.floor(total);
              }
              return dish;
            });
            localStorage.setItem(STORAGE.DISHES, JSON.stringify(newDishes));
            return newDishes;
          });
        }
      } else {
        alert("Quantity must be a number");
      }
    }
  };

  const handleRemove = (id: string) => {
    decreaseTotalCartItems();
    setDishes((dishes) => {
      const newDishes = dishes.filter((dish) => dish.id !== id);
      localStorage.setItem(STORAGE.DISHES, JSON.stringify(newDishes));
      return newDishes;
    });
  };

  const handleOrder = async () => {
    if (!role) {
      navigate(ROUTES.LOGIN, { state: { from: ROUTES.CART } });
      return;
    }

    try {
      const result = await createOrderRequest({
        products: dishes.map((dish) => ({
          productId: dish.id,
          amount: dish.quantity
        }))
      });

      if (result.data.success) {
        setDishes([]);
        resetTotalCartItems();
        localStorage.removeItem(STORAGE.DISHES);
        navigate(ROUTES.TRANSACTION_HISTORY);
        toast.success("Ordered successfully.");
      } else {
        toast.error(result.data.message);
      }
    } catch (err) {
      console.error(err);
      // @ts-ignore
      toast.error(err?.message || "An error occured.");
    }
  };

  return (
    <div className="mx-4 lg:mx-32 2xl:mx-64">
      <Breadcrumb
        title="Cart"
        routes={[{ title: "Home", href: ROUTES.HOMEPAGE }]}
        className="mt-8"
      />
      {!dishes.length && (
        <div className="text-center">
          <div className="text-3xl mb-4 mt-8">Empty</div>
          <Link to={ROUTES.HOMEPAGE}>Go to homepage</Link>
        </div>
      )}
      {dishes.map((dish) => (
        <div key={dish.id} className="bg-pink-200 my-2 p-4">
          <div className="flex justify-between">
            <div className="flex">
              <div>
                <div>{dish.restaurant}</div>
                <div>{`Name: ${dish.name}`}</div>
                <div>{`Quantity: ${dish.quantity}`}</div>
                <div>{`Unit price: $${getRoundedNum(dish.price, 2)}`}</div>
                <div className="font-bold">{`Total Paid: $${getRoundedNum(
                  dish.price * dish.quantity,
                  2
                )}`}</div>
              </div>
              <div className="w-24 ml-8 hidden md:block">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
            <div>
              <div className="text-right">{dish.orderDate}</div>
              <div className="w-20 ml-8 md:hidden my-2">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={dish.image}
                    alt={dish.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-center mt-2">
            <Button
              title="EDIT"
              color="white"
              border
              onClick={() => handleEdit(dish.id)}
              className="mr-4"
            />
            <Button
              title="REMOVE"
              color="white"
              border
              onClick={() => handleRemove(dish.id)}
            />
          </div>
        </div>
      ))}
      {!!dishes.length && (
        <div className="flex justify-end">
          <div className="bg-pink-200 p-4 my-8 flex flex-col items-center">
            <table>
              <tbody>
                {dishes.map((dish) => (
                  <tr key={dish.id}>
                    <td>{dish.name}</td>
                    <td className="pl-6">{`$${getRoundedNum(
                      dish.price * dish.quantity,
                      2
                    )}`}</td>
                  </tr>
                ))}
                <tr className="font-bold">
                  <td>Total</td>
                  <td className="pl-6">
                    {`$${getRoundedNum(
                      dishes.reduce(
                        (total, dish) => total + dish.quantity * dish.price,
                        0
                      ),
                      2
                    )}`}
                  </td>
                </tr>
              </tbody>
            </table>
            <Button
              title="ORDER"
              color="white"
              border
              onClick={handleOrder}
              className="mt-4"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
