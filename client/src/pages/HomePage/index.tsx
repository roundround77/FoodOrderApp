import clsx from "clsx";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import Button from "../../components/Button";
import ProductCard from "../../components/ProductCard";
import { ROUTES } from "../../constants/routes";
import { getRestaurantsRequest } from "../../services/restaurant.service";
import { getRoute } from "../../utils/getRoute";

interface IRestaurant {
  _id: string;
  name: string;
  image: string;
  createdAt: string;
  updatedAt: string | null;
}

const ITEMS_PER_PAGE = 4;

const HomePage: FC = () => {
  const [restaurants, setRestaurants] = useState<IRestaurant[]>([]);
  const [totalRenderRestaurants, setTotalRenderRestaurants] =
    useState<number>(ITEMS_PER_PAGE);

  useEffect(() => {
    try {
      (async () => {
        const result = await getRestaurantsRequest();
        if (result.data.success) {
          setRestaurants(result.data.data);
        } else {
          toast.error(result.data.message);
        }
      })();
    } catch (err) {
      console.error(err);
      // @ts-ignore
      toast.error(err?.message || "An error occured.");
    }
  }, []);

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 w-full px-4 md:px-0 md:gap-8 md:w-[36rem] lg:grid-cols-3 lg:gap-8 lg:w-[54rem] xl:grid-cols-4 xl:gap-8 xl:w-[70rem] mx-auto my-16">
        {restaurants.slice(0, totalRenderRestaurants).map((restaurant) => (
          <ProductCard
            key={restaurant._id}
            title={restaurant.name}
            imgUrl={restaurant.image}
            href={getRoute(ROUTES.ORDER, { restaurantId: restaurant._id })}
          />
        ))}
      </div>
      <div
        className={clsx(
          { hidden: totalRenderRestaurants >= restaurants.length },
          "flex justify-center mb-8"
        )}
      >
        <Button
          title="VIEW MORE"
          onClick={() =>
            setTotalRenderRestaurants(totalRenderRestaurants + ITEMS_PER_PAGE)
          }
        />
      </div>
    </div>
  );
};

export default HomePage;
