import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "@/app/common/axios";
import {
  PeriodicityOption,
  StandingOrderDetailType,
  ConstantSymbolOption,
} from "@/app/common/types";
import StandingOrderForm from "@/app/components/StandingOrderForm";
import dayjs from "dayjs";
import StandingOrderFormHeader from "@/app/components/StandingOrderFormHeader";
import ConfirmActionDialog from "@/app/components/ConfirmActionDialog";

function EditOrderComponent() {
  const router = useRouter();
  const NEW_SLUG = "new";
  const { slug: orderId } = router.query;
  const [standingOrder, setStandingOrder] = useState<StandingOrderDetailType>();
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [formValues, setFormValues] = useState<StandingOrderDetailType | null>(
    null
  );
  const [coordinates, setCoordinates] = useState<string>("");

  const today = dayjs();

  const handleClose = () => {
    setDialogOpen(false);
  };

  const sendRequest = () => {
    if (formValues) {
      if (orderId === NEW_SLUG) {
        // Create mode
        axios
          .post(`/standingOrder`, formValues, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            router.push("/");
          })
          .catch((error) => {
            alert("Failed to create standing order. Please try again later.");
            console.log(error);
          });
      } else {
        // Edit mode
        axios
          .put(`/standingOrder/${orderId}`, formValues, {
            headers: {
              "Content-Type": "application/json",
            },
          })
          .then(() => {
            router.push("/");
          })
          .catch((error) => {
            alert("Failed to update standing order. Please try again later.");
            console.log(error);
          });
      }
    }
    setDialogOpen(false);
  };

  const handleConfirm = (pin: string) => {
    axios
      .post(
        `/grid-card/validate`,
        { pin: pin, coordinate: coordinates },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then(() => {
        sendRequest();
      })
      .catch((error) => {
        alert("Failed to validate pin. Please try again.");
        console.log(error);
      });
  };
  useEffect(() => {
    if (orderId) {
      if (typeof orderId === "string" && orderId !== NEW_SLUG) {
        axios
          .get(`/standingOrder/${orderId}`)
          .then((response) => {
            setStandingOrder(response.data);
          })
          .catch((error) => {
            setError("Failed to fetch standing order. Please try again later.");
            console.error(error);
          })
          .finally(() => {
            setIsLoading(false);
          });
      } else {
        setIsLoading(false);
      }
    }
  }, [orderId]);

  const handleSubmit = (values: StandingOrderDetailType) => {
    setFormValues(values);
    axios
      .get(`/grid-card/init`)
      .then((response) => {
        setCoordinates(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    setDialogOpen(true);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <StandingOrderFormHeader
        text={
          orderId === NEW_SLUG ? "Nový trvalý příkaz" : "Upravit trvalý příkaz"
        }
      />
      <StandingOrderForm
        initialValues={
          standingOrder
            ? {
                name: standingOrder.name || "",
                accountNumber: standingOrder.accountNumber || "",
                amount: standingOrder.amount || 0,
                variableSymbol: standingOrder.variableSymbol || "",
                constantSymbol: standingOrder.constantSymbol || "",
                specificSymbol: standingOrder.specificSymbol || "",
                note: standingOrder.note || "",
                intervalId: standingOrder.intervalId || 1,
                intervalSpecification: standingOrder.intervalSpecification || 0,
                validFrom: dayjs(standingOrder.validFrom).isAfter(today)
                  ? dayjs(standingOrder.validFrom)
                  : today.add(1, "day"),
              }
            : {
                name: "",
                accountNumber: "",
                amount: 0,
                variableSymbol: "",
                constantSymbol: "",
                specificSymbol: "",
                note: "",
                intervalId: 1,
                intervalSpecification: 0,
                validFrom: today.add(1, "day"),
              }
        }
        onSubmit={handleSubmit}
      />
      <ConfirmActionDialog
        open={dialogOpen}
        onClose={handleClose}
        onConfirm={handleConfirm}
        coordinates={coordinates}
      />
    </>
  );
}

export default EditOrderComponent;
