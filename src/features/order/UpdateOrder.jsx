import { useFetcher } from "react-router-dom";
import { updateOrders } from "../../services/apiPizzaMenu";
import Button from "../../ui/Button";

export default function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH">
      <input type="text" name="customer" className="inputs bg-slate-300" />
      <Button type={"primary"}>Make Priorirty</Button>;
    </fetcher.Form>
  );
}

export async function Action({ request, params }) {
  const FormData = await request.formData();
  const data = Object.fromEntries(FormData);

  const updatePatch = {
    ...data,
    priority: true,
  };

  console.log(updatePatch);
  await updateOrders(params.orderId, updatePatch);
  return null;
}
