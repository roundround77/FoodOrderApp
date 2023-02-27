import clsx from "clsx";
import moment from "moment";
import { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import ProductCard from "../../components/ProductCard";
import { ROUTES } from "../../constants/routes";
import { STORAGE } from "../../constants/storage";
import { UserContext } from "../../layouts/UserLayout";
import { getDishesRequest } from "../../services/dish.service";
import { getRestaurantDetailRequest } from "../../services/restaurant.service";
import { getListFromStorage } from "../../utils/storage";

interface IDish {
  _id: string;
  name: string;
  image: string;
  description: string;
  price: number;
  status: number;
  createdAt: string;
  updatedAt: string | null;
}

const ITEMS_PER_PAGE = 4;

const OrderPage: FC = () => {
  const [restaurantName, setRestaurantName] = useState<string>("");
  const [dishes, setDishes] = useState<IDish[]>([]);
  const [totalRenderDishes, setTotalRenderDishes] =
    useState<number>(ITEMS_PER_PAGE);

  const { increaseTotalCartItems } = useContext(UserContext);
  const { restaurantId } = useParams();

  useEffect(() => {
    if (!restaurantId) return;

    try {
      (async () => {
        const result = await getDishesRequest({ restaurant: restaurantId });
        if (result.data.success) {
          setDishes(result.data.data?.data || []);
        } else {
          toast.error(result.data.message);
        }
      })();
    } catch (err) {
      console.error(err);
      // @ts-ignore
      toast.error(err?.message || "An error occured.");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!restaurantId) return;

    try {
      (async () => {
        const result = await getRestaurantDetailRequest(restaurantId);
        if (result.data.success) {
          setRestaurantName(result.data.data?.name);
        } else {
          toast.error(result.data.message);
        }
      })();
    } catch (err) {
      console.error(err);
      // @ts-ignore
      toast.error(err?.message || "An error occured.");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAddToCart = (dish: IDish) => {
    const quantity = prompt("Enter quantity:");
    if (quantity) {
      if (Number.isInteger(Number(quantity))) {
        const total = +quantity;
        if (total) {
          const { _id: id, name, price, image } = dish;

          const dishesList = getListFromStorage(STORAGE.DISHES);
          const existDishIndex = dishesList.findIndex((dish) => dish.id === id);
          const time = moment();

          const newDish = {
            id,
            name,
            quantity: Math.floor(total),
            restaurant: restaurantName,
            price,
            image,
            orderDate: time.format("HH:mm DD:MM:YYYY")
          };

          if (existDishIndex >= 0) {
            dishesList.splice(existDishIndex, 1, newDish);
          } else {
            dishesList.push(newDish);
            increaseTotalCartItems();
          }

          localStorage.setItem(STORAGE.DISHES, JSON.stringify(dishesList));

          alert("Added order to cart");
        }
      } else {
        alert("Quantity must be a number");
      }
    }
  };

  return (
    <div>
      <Breadcrumb
        title={restaurantName}
        routes={[{ title: "Home", href: ROUTES.HOMEPAGE }]}
        className="mx-4 lg:mx-32 2xl:mx-64 mt-8"
      />
      <div className="grid grid-cols-2 gap-4 w-full px-4 md:px-0 md:gap-8 md:w-[36rem] lg:grid-cols-3 lg:gap-8 lg:w-[54rem] xl:grid-cols-4 xl:gap-8 xl:w-[70rem] mx-auto mt-8 mb-16">
        {dishes.slice(0, totalRenderDishes).map((dish) => (
          <ProductCard
            type="dish"
            key={dish._id}
            title={dish.name}
            imgUrl={dish.image}
            onClick={() => handleAddToCart(dish)}
          />
        ))}
      </div>
      <div
        className={clsx(
          { hidden: totalRenderDishes >= dishes.length },
          "flex justify-center mb-8"
        )}
      >
        <Button
          title="VIEW MORE"
          onClick={() =>
            setTotalRenderDishes(totalRenderDishes + ITEMS_PER_PAGE)
          }
        />
      </div>
    </div>
  );
};

export default OrderPage;
