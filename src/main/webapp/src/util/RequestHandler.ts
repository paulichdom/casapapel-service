export const handleRequest = (
    request: Promise<any>,
    thunkApi: { rejectWithValue: (arg0: any) => any }
  ) => {
    return request
      .then((response) => response.data)
      .catch((error) =>
        thunkApi.rejectWithValue(error.response.data.restapiexception)
      );
  };