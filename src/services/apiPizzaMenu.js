const API_URL = "https://react-fast-pizza-api.onrender.com/api";

export async function getPizzaMenu() {
  const res = await fetch(`${API_URL}/menu`);

  if (!res.ok) throw new Error("Data Fetching Failed");
  const { data } = await res.json();

  return data;
}

export async function getOrder(id) {
  const res = await fetch(`${API_URL}/order/${id}`);

  if (!res.ok) throw new Error(`Couldn't find order #${id}`);

  const { data } = await res.json();

  return data;
}

export async function createOrder(newOrder) {
  try {
    const res = await fetch(`${API_URL}/order`, {
      method: "POST",
      body: JSON.stringify(newOrder),
      headers: { "Content-Type": "application/json" },
    });

    if (!res.ok) throw new Error("Creating data failed ");
    const { data } = await res.json();
    return data;
  } catch (err) {
    throw new Error(err.message);
  }
}

export async function updateOrders(id, updateObj) {
  try {
    const res = await fetch(`${API_URL}/order/${id}`, {
      method: "PATCH",
      body: JSON.stringify(updateObj),
      headers: { "Content-Type": "application/json" },
    });
    if (!res.ok)
      throw new Error("Data was not been updated please try again later");
  } catch (err) {
    throw new Error(err.message);
  }
}
