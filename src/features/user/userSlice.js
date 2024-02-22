import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getPositionAddress } from "../../services/apiGeoLocation";

function getPosition() {
  return new Promise(function (resovle, reject) {
    navigator.geolocation.getCurrentPosition(resovle, reject);
  });
}

export const fetchAddress = createAsyncThunk(
  "user/fetchAdress",
  async function () {
    //get the user location
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    //reverse geolocation
    const addressOjb = await getPositionAddress(position);
    const address = `${addressOjb?.countryCode}, ${addressOjb?.city} , ${addressOjb?.postcode} ${addressOjb?.countryName.split(" ").at(0)}`;

    // payload data
    return { position, address };
  },
);

const initialState = {
  username: "",
  status: "idle",
  position: {},
  address: "",
  error: "",
};

const userReducer = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.username = action.payload;
    },
  }, //Reduce thuunks
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.position = action.payload.position;
        state.address = action.payload.address;
        state.status = "idle";
      })
      .addCase(fetchAddress.rejected, (state) => {
        state.status = "error";
        state.error =
          "Geolocation Failed Please Try Again to get you current Location Thank you!";
      }),
});

export const { updateName } = userReducer.actions;

export default userReducer.reducer;

export const getUsername = (store) => store.user.username;

export const getAllData = (store) => store.user;
