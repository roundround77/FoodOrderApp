import moment from "moment";
import { FC, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { uniqBy } from "lodash";
import Breadcrumb from "../../components/Breadcrumb";
import Button from "../../components/Button";
import { ROUTES } from "../../constants/routes";
import { getOrdersRequest } from "../../services/order.service";
import { getRoundedNum } from "../../utils/getRoundedNum";
import clsx from "clsx";

export interface ITransaction {
  _id: string;
  orderStatus: number;
  products: Array<{
    amount: number;
    productId: {
      _id: string;
      name: string;
      description: string;
      restaurant: {
        _id: string;
        name: string;
        image: string;
      };
      image: string;
      price: number;
      status: number;
    };
  }>;
  userId: {
    _id: string;
    email: string;
    fullname: string;
    role: number;
    status: number;
  };
  createdAt: string;
  updatedAt: string | null;
}

const ITEMS_PER_PAGE = 10;

const TransactionHistoryPage: FC = () => {
  const [transactions, setTransactions] = useState<ITransaction[]>([]);
  const [totalRenderTransactions, setTotalRenderTransactions] =
    useState<number>(ITEMS_PER_PAGE);
  const [openTransactionIds, setOpenTransactionIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      (async () => {
        const result = await getOrdersRequest();
        if (result.data.success) {
          setTransactions(result.data.data);
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
    <div className="mx-4 lg:mx-32 2xl:mx-64">
      <Breadcrumb
        title="Transactions"
        routes={[{ title: "Home", href: ROUTES.HOMEPAGE }]}
        className="mt-8"
      />
      {transactions.slice(0, totalRenderTransactions).map((transaction) => (
        <div key={transaction._id} className="bg-pink-200 my-2 p-4">
          <div className="flex justify-between">
            <div>
              {uniqBy(transaction.products, "productId.restaurant._id").map(
                (product) => (
                  // @ts-ignore
                  <div key={product?.productId?.restaurant}>
                    {product?.productId?.restaurant?.name}
                  </div>
                )
              )}
              <div>{`Transaction Key: ${transaction._id}`}</div>
              <div className="font-bold">{`Total Paid: $${getRoundedNum(
                transaction.products.reduce(
                  (total, item) =>
                    total + item.amount * (item.productId?.price || 0),
                  0
                ),
                2
              )}`}</div>
            </div>
            <div>
              {moment(transaction.createdAt).format("HH:MM DD/MM/YYYY")}
            </div>
          </div>
          <table
            className={clsx(
              { hidden: !openTransactionIds.includes(transaction._id) },
              "w-full my-2"
            )}
          >
            <thead className="font-bold">
              <tr>
                <td>Name</td>
                <td>Image</td>
                <td>Restaurant</td>
                <td>Unit price</td>
                <td>Quantity</td>
                <td>Total</td>
              </tr>
            </thead>
            <tbody>
              {transaction.products.map((product) => {
                if (product.productId)
                  return (
                    <tr key={product.productId._id}>
                      <td>{product.productId.name}</td>
                      <td>
                        <img
                          src={product.productId?.image}
                          alt={product.productId?.name}
                          className="w-20 h-16 object-cover my-1"
                        />
                      </td>
                      <td>{product.productId.restaurant.name}</td>
                      <td>{`$${getRoundedNum(product.productId.price, 2)}`}</td>
                      <td>{product.amount}</td>
                      <td>{`$${getRoundedNum(
                        product.productId.price * product.amount,
                        2
                      )}`}</td>
                    </tr>
                  );
              })}
            </tbody>
          </table>
          <div className="flex justify-center mt-2">
            <Button
              title={
                openTransactionIds.includes(transaction._id) ? "LESS" : "MORE"
              }
              color="white"
              border
              onClick={() =>
                setOpenTransactionIds(
                  openTransactionIds.includes(transaction._id)
                    ? openTransactionIds.filter((id) => id !== transaction._id)
                    : [...openTransactionIds, transaction._id]
                )
              }
            />
          </div>
        </div>
      ))}
      <div
        className={clsx(
          { hidden: totalRenderTransactions >= transactions.length },
          "flex justify-center my-8"
        )}
      >
        <Button
          title="VIEW MORE"
          onClick={() =>
            setTotalRenderTransactions(totalRenderTransactions + ITEMS_PER_PAGE)
          }
        />
      </div>
    </div>
  );
};

export default TransactionHistoryPage;
